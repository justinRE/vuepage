<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="!isAuthenticatedPromiseResult" to="/home">Home</router-link>
      <router-link v-if="isAuthenticatedPromiseResult" to="/profile">Profile</router-link>  
      <router-link v-if="isAuthenticatedPromiseResult && $store.state.role==='customer'" to="/card">Punch Card</router-link>
      <router-link v-if="isAuthenticatedPromiseResult && $store.state.role==='admin'" to="/customers">Customers</router-link>
      <router-link v-if="isAuthenticatedPromiseResult && $store.state.role==='admin'" to="/adminpanel">Admin Panel</router-link> |
      <button v-if="isAuthenticated" @click="logout" class="btn-logout">Logout</button>
      <button v-else @click="login" class="btn-login">Login</button>
    </div>
    <router-view @authenticated="setAuthenticated"/>
  </div>
</template>

<script>
import store from './store'

export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: null,
      role: 'admin'
    };
  },
  computed: {
    isAuthenticatedPromiseResult() {
      return this.isAuthenticated === true;
    },
  },
  methods: {
    setAuthenticated(status) {
      this.isAuthenticated = status;
    },
    async login() {
      await this.$auth.signInWithRedirect({ originalUri: '/profile' }).finally(
        {
          // if succesfully logged in, then post to to your azure function store user api
        }
      )
    },
    async logout() {
      console.log("Logging out...")
      await this.$auth.signOut()
      console.log("Logged out.")
      this.isAuthenticated = false;
      router.push('/home');
    }
  },
  created() {
    this.$auth.isAuthenticated().then((result) => {
      this.isAuthenticated = result;
      console.log("isAuthenticated:", result);
      console.log("role:", role);
    });
  }
}
</script>



<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding-right: 10px;
}

#nav a:not(:first-child) {
  border-left: 1px solid #2c3e50;
  padding-left: 10px; 
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.btn-login,
.btn-logout {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
  text-decoration: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-weight: bold;
  text-decoration: underline;
}

.btn-login:hover,
.btn-logout:hover {
  text-decoration: underline;
}

</style>
