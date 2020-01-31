const error = {
  namespaced: true,
  state: {
    error: null
  },
  mutations: {
    // エラー情報をstateに格納
    setError(state, error) {
      state.error = error
    },
    // エラー情報をstateからクリア
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    setError({ commit }, error) {
      commit('setError', error)
    },
    clearError({ commit }) {
      commit('clearError')
    }
  }
}

export default error
