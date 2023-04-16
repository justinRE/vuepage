import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
      })],
    state: {
      email: '',
      name: '',
      phone: '',
      apim: 'collidegateway.azure-api.net',
      token: '',
      role: 'customer'
    },
  mutations: {
    SET_EMAIL(state, email) {
      state.email = email
    },
    SET_NAME(state, name) {
      state.name = name
    },
    SET_PHONE(state, phone) {
      state.phone = phone
    },
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_ROLE(state, role) {
      state.role = role
    }

  },
  actions: {
    getEmail(){
      return this.email;
    },
    setEmail({ commit }, email) {
      if (email === 'herryone1@gmail.com'){
        console.log("overriding role to admin for " + email)
        commit('SET_ROLE', 'admin')
      }
      else{
        console.log("setting role to customer for " + email)
        commit('SET_ROLE', 'customer')
      }
      commit('SET_EMAIL', email)
    },
    setName({ commit }, name) {
      commit('SET_NAME', name)
    },
    setPhone({ commit }, phone) {
      commit('SET_PHONE', phone)
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    }
  }
})
