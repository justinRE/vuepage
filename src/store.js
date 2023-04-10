import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: ''
  },
  mutations: {
    SET_USER_NAME(state, name) {
      state.userName = name
    }
  },
  actions: {
    setUserName({ commit }, name) {
      commit('SET_USER_NAME', name)
    }
  }
})
