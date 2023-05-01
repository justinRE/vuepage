import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ToastPlugin from 'vue-toast-notification';

new Vue({
  router,
  store,
  ToastPlugin,
  render: function (h) { return h(App) }
}).$mount('#app')
