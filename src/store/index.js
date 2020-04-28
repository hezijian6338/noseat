import Vue from 'vue'
import Vuex from 'vuex'
import { loginStore } from '@/store/login'

import { checkTime } from '@/api/record'
import { seatDown, seatLeave, seatTempLeave } from '@/api/seat'


Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        timecount: 1000,
        neverchangTime: 0,
        duration: 0,
        tagName: '',
        showLoginForm: false,
        status: 'chill', //chill没在学习 study学习 temp暂离
    },
    mutations: {
        setStatus(state, s) {
            state.status = s
        },
        setShowLoginForm(state, bool) {
            state.showLoginForm = bool
        },
        TimeStart(state, payload) {
            state.neverchangTime = payload.time
            state.duration = payload.time
            state.tagName = payload.tagName
        },
        Timedown(state) {
            state.duration = state.duration - 1
        },
        TimeZero(state) {
            state.neverchangTime = 0
            state.duration = 0
        },
    },
    actions: {
        setShowLoginForm(context, { bool }) {
            context.commit('setShowLoginForm', bool)
        },
        TimeCalculate(context) {
            let time1 = setInterval(() => {
                if (context.state.duration > 0) {
                    context.commit('Timedown')
                } else {
                    clearInterval(time1)
                }
            }, 1000)
        },
        timer({ dispatch, commit }, { time, tagName }) {
            commit('TimeStart', { time, tagName })
            dispatch('TimeCalculate')
        },
        // 不是每次都用checktime，刷新页面的时候才用checktime
        // 另外，用cookie把固定的时间存起来，刷新页面之后也可以用到固定的时间
        // 总结
        // 用到checktime的地方：登录、刷新、状态更变
        // 每次用到checktime的时候，如果有计时，改变neverchangeTime的值
        // 不要重复调用计时器
        checkTime(context) {
            return new Promise((resolve, reject) => {
                let token = context.state.token
                checkTime(token).then(result => {
                    let t1 = result.data.wantedTime
                    let t2 = 0
                    if (result.data.studiedTime) {
                        t2 = result.data.studiedTime
                        context.commit('setStatus', 'study')
                        resolve('study')
                    } else if (result.data.tempLeaveTime) {
                        t2 = result.data.tempLeaveTime
                        context.commit('setStatus', 'temp')
                        resolve('temp')
                    } else {
                        context.commit('setStatus', 'chill')
                        resolve('chill')
                    }
                    let tagName = result.data.momentTag
                    let time = parseInt((t1 - t2) / 1000)
                    context.dispatch('timer', { time, tagName })
                }).catch(error => {
                    reject(error)
                })
            })
        },
        seatDown(context, { montentTag, roomNumber, seatsNumber, wantedTime }) {
            return new Promise((resolve, reject) => {
                seatDown({ montentTag, roomNumber, seatsNumber, wantedTime }).then(result => {
                    context.commit('setStatus', 'study')
                    resolve('study')
                    context.dispatch('timer', {
                        time: wantedTime,
                        tagName: montentTag
                    })
                }).catch(error => {
                    this.error = error
                    reject(error)
                })
            })
        },
        endStudy(context) {
            seatLeave().then(result => {
                context.commit('TimeZero')
                context.dispatch('setStatus', 'chill')
            })
        },
        tempLeave(context) {
            return new Promise((resolve, reject) => {
                seatTempLeave()
                    .then(result => {
                        return context.dispatch('checkTime')
                    })
                    .then(result => {
                        resolve(result)
                    }).catch(error => {
                        reject(error)
                    })
            })
        }
    },
    getters: {
        countTime(state) {
            let second = state.duration % 60
            let min = Math.floor(state.duration / 60)
            if (second < 10)
                return min + ':0' + second
            else
                return min + ':' + second
        },
        percent(state) {
            return ((state.neverchangTime - state.duration) / state.neverchangTime) * 100
        }
    },
    modules: {
        login: loginStore,
    }


})

export default store