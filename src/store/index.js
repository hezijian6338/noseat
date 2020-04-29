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
            console.log('payload ', payload);
            state.neverchangTime = payload.never
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
        checkTime(context) {
            return new Promise((resolve, reject) => {
                let token = context.state.token
                checkTime(token).then(result => {
                    let t1 = result.data.wantedTime
                    let t2 = 0
                    // 设置状态
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
                    let never = parseInt(t1 / 1000)
                    let time = parseInt((t1 - t2) / 1000)
                    let tagName = result.data.momentTag
                    context.commit('TimeStart', { never, time, tagName })
                }).catch(error => {
                    reject(error)
                })
            })
        },
        seatDown(context, { montentTag, roomNumber, seatsNumber, wantedTime }) {
            return new Promise((resolve, reject) => {
                seatDown({ montentTag, roomNumber, seatsNumber, wantedTime }).then(result => {
                    resolve('study')
                    context.dispatch('checkTime')
                }).catch(error => {
                    this.error = error
                    reject(error)
                })
            })
        },
        endStudy(context) {
            seatLeave().then(result => {
                context.commit('TimeZero')
                context.commit('setStatus', 'chill')
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