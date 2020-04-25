import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

import {

} from 'element-ui'

import 'lib-flexible'
import './plugins/element.js'

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  let token = Cookies.get('token') == undefined ? '' : Cookies.get('token')
  if (to.path == '/login' && token == '') {
    next()
  } else if (to.path == '/login' && token != '') {
    store
      .dispatch('isLogin')
      .then((result) => {
        next({ path: '/study' })
      })
      .catch(error => {
        next()
      })
  } else if (to.path != '/login' && token == '') {
    next({ path: '/login' })
  } else {
    store
      .dispatch('isLogin')
      .then((result) => {
        next()
      })
      .catch(error => {
        next({ path: '/login' })
      })
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
