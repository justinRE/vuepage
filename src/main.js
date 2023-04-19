import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store';

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
