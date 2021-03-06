import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './style/app.scss'
import './plugins/firebase'
import './plugins/infinite-loading'
import './plugins/fontawesome'
import './plugins/sweetalert2'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
