<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link>
      <router-link to="/profile">Profile</router-link>  
      <router-link to="/card">Punch Card</router-link>
      <router-link to="/customers">Customers</router-link>
      <router-link to="/adminpanel">Admin Panel</router-link> |
      <a class="btn-logout" :href="$store.state.website + '/.auth/logout?post_logout_redirect_uri=/'">Logout</a>
      <a class="btn-login" :href="$store.state.website + '/.auth/login/aad?post_login_redirect_uri=/'">Login</a>
      <!-- v-if="isAuthenticatedPromiseResult && $store.state.role==='admin'" -->
    </div>
  <!--<router-view @authenticated="setAuthenticated"/> -->  
  </div>
</template>

<script>
import store from './store'

export default {
  name: 'App',
  data() {
    return {
      role: 'admin'
    };
  },
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
