import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/*By default, Webpack generates chunk names based on the file name and a    hash 
By adding a Webpack chunk name comment, there is a more descriptive name for the chunk, makes it easier to debug.*/
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

export default router
