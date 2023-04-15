import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: '',
    name: ''
  },
  mutations: {
    SET_EMAIL(state, email) {
      state.email = email
    },
    SET_NAME(state, name) {
      state.name = name
    }
  },
  actions: {
    setEmail({ commit }, email) {
      commit('SET_EMAIL', email)
    },
    setName({ commit }, name) {
      commit('SET_NAME', name)
    }
  }
})
