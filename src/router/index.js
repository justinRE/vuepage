import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://Dev-71617988.okta.com/oauth2/default',
  client_id: '0oa8xojnpxKG707955d7',
  redirect_uri: 'http://localhost:8080/login/callback',
  scope: 'openid profile email'
})

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
    },
    meta: {
      requiresAuth: true
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
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/adminpanel',
    name: 'Panel',
    component: function () {
      return import(/* webpackChunkName: "panel" */ '../views/Panel.vue')
    },
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/scanpunches',
    name: 'PunchScan',
    component: function () {
      return import(/* webpackChunkName: "PunchScan" */ '../views/PunchScan.vue')
    },
    meta: {
      requiresAuth: false
    },
  },
  {
    path: '/scanrewards',
    name: 'RewardScan',
    component: function () {
      return import(/* webpackChunkName: "RewardScan" */ '../views/RewardScan.vue')
    },
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/login/callback',
    component: Auth.handleCallback()
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
