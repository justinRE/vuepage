import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@okta/okta-vue'
import { LoginCallback, navigationGuard } from '@okta/okta-vue'
import { OktaAuth } from '@okta/okta-auth-js'

Vue.use(VueRouter)

const oktaAuth= new OktaAuth({
  clientId: '0oa8xojnpxKG707955d7',
  issuer: 'https://dev-71617988.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email', 'phone']
})

Vue.use(Auth, { oktaAuth })

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: function () {
      return import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    meta: {
      requiresAuth: false
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
      requiresAuth: true
    }
  },
  {
    path: '/scanpunches',
    name: 'PunchScan',
    component: function () {
      return import(/* webpackChunkName: "PunchScan" */ '../views/PunchScan.vue')
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/scanrewards',
    name: 'RewardScan',
    component: function () {
      return import(/* webpackChunkName: "RewardScan" */ '../views/RewardScan.vue')
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: function () {
      return import(/* webpackChunkName: "RewardScan" */ '../views/Profile.vue')
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login/callback',
    component: LoginCallback
  },
    // Add catch-all route to redirect virtual routes to index.html
    {
      path: '*',
      redirect: { name: 'Home' } // Change the name of the default route
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(navigationGuard)

export default router
