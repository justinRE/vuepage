<template>
  <div>
      <h2>Welcome {{ $store.state.name }}</h2>
      <div>{{ $store.state.email }}</div>
      <div>{{ $store.state.phone }}</div>
      <div>{{ $store.state.role }}</div>
      <div>{{ info }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios';

export default {
name: 'Profile',
data () {
  return {
    claims: [],
    info: null
  }
},
mounted(){
  axios
    .get('/.auth/me')
    .then(response => (this.info = response))
},
async created () {
  const userDetails = this.info.data.clientPrincipal.userDetails;

  var name = userDetails.split('@')[0];
  console.log("setting name: " + name)
  this.setName(name)

  var email = userDetails;
  console.log("setting email: " + email)
  this.setEmail(email)

  var phone = "502-802-6596"
  console.log("setting phone [mocked]: " + phone)
  this.setPhone(phone)

  var roles = this.info.data.clientPrincipal.userRoles;
  console.log("Setting roles: " + roles);
  this.setRole(roles);
},
methods: {
  ...mapActions(['setName']),
  ...mapActions(['setEmail']),
  ...mapActions(['setPhone']),
  ...mapActions(['setRole']),
  GetUserInfo(){
  }
}
}
</script>

<style>

</style>
