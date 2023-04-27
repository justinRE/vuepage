<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link>
      <router-link v-if="$store.state.role.includes('anonymous') && !$store.state.role.includes('admin')" to="/profile">Profile</router-link>  
      <router-link v-if="$store.state.role.includes('anonymous') && !$store.state.role.includes('admin')" to="/card">Punch Card</router-link>
      <router-link v-if="$store.state.role.includes('admin')" to="/customers">Customers</router-link>
      <router-link v-if="$store.state.role.includes('admin')" to="/adminpanel">Admin Panel</router-link>
      <!--maybe try redirecting logout to home, rn it makes you log back in-->
      <a class="btn-logout" :href="window.location.origin + '/.auth/logout?post_logout_redirect_uri=/home'" @click="logout" v-if="loggedIn">Logout</a>
      <a class="btn-login" :href="window.location.origin + '/.auth/login/aad?post_login_redirect_uri=/profile'" v-if="!loggedIn">Login</a>
    </div>
    <router-view/>
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
  methods: {
  logout() {
      // clear user info from store
    this.$store.commit('SET_EMAIL', '');
    this.$store.commit('SET_NAME', '');
    this.$store.commit('SET_PHONE', '');
    this.$store.commit('SET_ROLE', '');

    // Reset the router links to only show Home and Login
    this.$router.options.routes = [
      { path: '/', component: Home },
      { path: '/login', component: Login }
    ];
    this.$router.push('/');
  },
},
computed: {
  loggedIn() {
    return this.$store.state.email !== '';
  },
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
