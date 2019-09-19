const user = {
  namespaced: true,
  state: {
    loginUser: null
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user
    },
    clearLoginUser(state) {
      state.loginUser = null
    }
  },
  actions: {
    setLoginUser({ commit }, user) {
      commit('setLoginUser', user)
    },
    clearLoginUser({ commit }) {
      commit('clearLoginUser')
    }
  }
}

export default user
