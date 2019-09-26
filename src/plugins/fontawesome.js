import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCog, faUserPlus, faSignInAlt, faUser, faTimesCircle, faPlusCircle, faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// fontawesomeを利用する
library.add(faUserCog, faUserPlus, faSignInAlt, faUser, faTimesCircle, faPlusCircle, faArrowAltCircleLeft, faArrowAltCircleRight)
Vue.component('font-awesome-icon', FontAwesomeIcon)
