import Cookies from 'js-cookie'
import {
    login,
    getInfo,
} from '@/api/login'
export const loginStore = {
    state: {
        token: '',
        userinfo: {},
    },
    mutations: {
        setToken(state, token) {
            Cookies.set('token', token)
            state.token = token
        },
        getToken(state) {
            let token = Cookies.get('token')
            state.token = token
        },
        setUserinfo(state, userinfo) {
            state.userinfo = userinfo
        },
        cleanLogininfo(state) {
            Cookies.set('token', '')
            state.token = ''
            state.userinfo = {}
        },
    },
    actions: {
        isLogin(context) {
            return new Promise((resolve, reject) => {
                let token = Cookies.get('token')
                getInfo(token)
                    .then((result) => {
                        if (result.code == 200) {
                            context.commit('setToken', token)
                            context.commit('setUserinfo', result.data)
                            resolve(result)
                        } else {
                            context.commit('cleanLogininfo')
                            reject(result)
                        }

                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        login(context, {
            username,
            password,
        }) {
            return new Promise((resolve, reject) => {
                let data = {
                    username,
                    password,
                }
                login(data)
                    .then((result) => {
                        context.commit('setToken', result.data)
                        resolve(result)
                    })
                    .catch(error => reject(error))
            })
        }
    },
    getters: {},
}