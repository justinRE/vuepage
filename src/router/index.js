import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '@okta/okta-vue'
import { LoginCallback, navigationGuard } from '@okta/okta-vue'
import ProfileComponent from '@/components/Profile'


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
    component: LoginCallback
  },
  {
    path: '/profile',
    component: ProfileComponent,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(navigationGuard)

export default router
