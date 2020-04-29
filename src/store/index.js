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
            state.neverchangTime = payload.neverchangTime
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
                    let neverchangTime = 0
                    let usedTime = 0
                    let tagName = ''
                    // 设置状态
                    if (result.data.studiedTime) {
                        neverchangTime = result.data.wantedTime
                        usedTime = result.data.studiedTime
                        tagName = result.data.momentTag
                        context.commit('setStatus', 'study')
                        resolve('study')
                    } else if (result.data.tempLeaveTime) {
                        neverchangTime = 1200000 //20分钟 1200000毫秒
                        usedTime = result.data.tempLeaveTime
                        tagName = '暂离'
                        context.commit('setStatus', 'temp')
                        resolve('temp')
                    } else {
                        context.commit('setStatus', 'chill')
                        resolve('chill')
                    }
                    let time = parseInt((neverchangTime - usedTime) / 1000)
                    context.commit('TimeStart', { neverchangTime: neverchangTime / 1000, time, tagName })
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