import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
      // route level code-splitting
      // this generates a separate chunk (Register.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: function () {
        return import(/* webpackChunkName: "register" */ '../views/Register.vue')
      }
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: function () {
      return import(/* webpackChunkName: "forgot" */ '../views/Forgot.vue')
    }
  },
  {
    path: '/card',
    name: 'Card',
    component: function () {
      return import(/* webpackChunkName: "card" */ '../views/Card.vue')
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    }
  },
  {
    path: '/customers',
    name: 'Customers',
    component: function () {
      return import(/* webpackChunkName: "customers" */ '../views/Customers.vue')
    }
  },
  {
    path: '/panel',
    name: 'Panel',
    component: function () {
      return import(/* webpackChunkName: "panel" */ '../views/Panel.vue')
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
