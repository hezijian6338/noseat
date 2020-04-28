import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'lib-flexible'
import './plugins/element.js'

Vue.config.productionTip = false

Vue.use(ElementUI);

// router.beforeEach((to, from, next) => {
//   let token = Cookies.get('token') == undefined ? '' : Cookies.get('token')
//   if (to.path == '/login' && token == '') {
//     next()
//   } else if (to.path == '/login' && token != '') {
//     store
//       .dispatch('isLogin')
//       .then((result) => {
//         next({ path: '/study' })
//       })
//       .catch(error => {
//         next()
//       })
//   } else if (to.path != '/login' && token == '') {
//     next({ path: '/login' })
//   } else {
//     store
//       .dispatch('isLogin')
//       .then((result) => {
//         next()
//       })
//       .catch(error => {
//         next({ path: '/login' })
//       })
//   }
// })

router.beforeEach((to, from, next) => {
  store
    .dispatch('isLogin')
    .then((result) => {
      store.dispatch('setShowLoginForm', {
        bool: false
      })
      next()
    })
    .catch(error => {
      store.dispatch('setShowLoginForm', {
        bool: true
      })
    })
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
