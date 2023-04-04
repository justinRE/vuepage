<template>
  <div id="app">
    <div id="nav">
      <button v-if="isAuthenticated" @click="logout" class="btn-logout">Logout</button>
      <button v-else @click="login" class="btn-login">Login</button>
      <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
      <router-link v-if="isAuthenticated" to="/card">Punch Card</router-link>
      <router-link v-if="isAuthenticated" to="/customers">Customers</router-link>
      <router-link v-if="isAuthenticated" to="/adminpanel">Admin Panel</router-link>
    </div>
    <router-view @authenticated="setAuthenticated"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated() {
      return this.$auth.isAuthenticated()
    },
  },
  methods: {
    setAuthenticated(status) {
    this.$data.authenticated = status
    },
    async login() {
      await this.$auth.signInWithRedirect({ originalUri: '/' })
    },
    async logout() {
    console.log("Logging out...")
    await this.$auth.signOut()
    console.log("Logged out.")
    }
  },
  created() {
  console.log("isAuthenticated:", this.isAuthenticated)
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
