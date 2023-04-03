import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import { OktaAuth } from '@okta/okta-auth-js'
import OktaVue from '@okta/okta-vue'
import config from '@/config'


const oktaAuth = new OktaAuth(config.oidc)

Vue.use(OktaVue, {
  oktaAuth,
})

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
