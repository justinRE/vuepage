import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ToastPlugin from 'vue-toast-notification';

Vue.use(ToastPlugin)

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
