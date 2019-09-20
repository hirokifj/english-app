import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './style/app.scss'
import './plugins/firebase'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCog, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// fontawesomeを利用する
library.add(faUserCog, faUserPlus, faSignInAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
