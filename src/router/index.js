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
    path: '/customers',
    name: 'Customers',
    component: function () {
      return import(/* webpackChunkName: "customers" */ '../views/Customers.vue')
    }
  },
  {
    path: '/adminpanel',
    name: 'Panel',
    component: function () {
      return import(/* webpackChunkName: "panel" */ '../views/Panel.vue')
    }
  },
  {
    path: '/scanpunches',
    name: 'PunchScan',
    component: function () {
      return import(/* webpackChunkName: "PunchScan" */ '../views/PunchScan.vue')
    }
  },
  {
    path: '/scanrewards',
    name: 'RewardScan',
    component: function () {
      return import(/* webpackChunkName: "RewardScan" */ '../views/RewardScan.vue')
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: function () {
      return import(/* webpackChunkName: "RewardScan" */ '../views/Profile.vue')
    }
  },
    // Add catch-all route to redirect virtual routes to Home
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
