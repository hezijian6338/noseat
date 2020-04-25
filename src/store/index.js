import Vue from 'vue'
import Vuex from 'vuex'

import {
    loginStore
} from '@/store/login'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        timecount: 1000,
        neverchangTime: 0,
        duration: 0,
        tagName: '1',
    },
    mutations: {
        TimeStart(state, payload) {
            state.neverchangTime = payload.time
            state.duration = payload.time
            state.tagName = payload.tagName
            // console.log(state.duration, state.tagName)
        },
        Timedown(state) {
            state.duration = state.duration - 1
        },
        TimeZero(state) {
            state.neverchangTime = 0
            state.duration = 0
        },
        setDuration(state, duration) {
            state.duration = duration
        },
        setNeverchangTime(state, neverchangTime) {
            state.neverchangTime = neverchangTime
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
    actions: {
        TimeCalculate(context) {
            let time1 = setInterval(
                () => {
                    if (context.state.duration > 0) {
                        context.commit('Timedown')
                        // console.log(context.state.duration)
                    } else clearInterval(time1)

                }, 1000)
        },
        timer({ dispatch, commit }, {
            time,
            tagName,
        }) {
            commit('TimeStart', {
                time,
                tagName,
            })
            dispatch('TimeCalculate', {
                time,
                tagName,
            })
        }
    },
    modules: {
        login: loginStore,
    }


})

export default store