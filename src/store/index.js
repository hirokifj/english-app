import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import error from './modules/error'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    error
  },
  plugins: [
    createPersistedState({
      key: 'english-app',
      paths: ['user.loginUser']
    })
  ]
})
