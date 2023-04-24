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
      //phone: '',
      apim: 'https://loyaltyapim2.azure-api.net',
      role: '',
      website: 'https://victorious-field-0b04a0c10.3.azurestaticapps.net'
    },
  mutations: {
    SET_EMAIL(state, email) {
      state.email = email
    },
    SET_NAME(state, name) {
      state.name = name
    },
    // SET_PHONE(state, phone) {
    //   state.phone = phone
    // },
    SET_ROLE(state, role) {
      state.role = role
    }

  },
  actions: {
    getEmail(){
      return this.email;
    },
    setEmail({ commit }, email) {
      commit('SET_EMAIL', email)
    },
    setName({ commit }, name) {
      commit('SET_NAME', name)
    },
    // setPhone({ commit }, phone) {
    //   commit('SET_PHONE', phone)
    // },
    setRole({commit}, role){
      commit('SET_ROLE', role)
    }
  }
})
