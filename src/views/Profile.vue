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
async created () {
  try {
    const response = await axios.get('/.auth/me')
    const clientPrincipal = response.data.clientPrincipal
    const userDetails = clientPrincipal.userDetails

    var name = userDetails
    console.log("setting name: " + name)
    this.setName(name)

    var email = userDetails
    console.log("setting email: " + email)
    this.setEmail(email)

    var phone = "502-802-6596"
    console.log("setting phone [mocked]: " + phone)
    this.setPhone(phone)

    var roles = clientPrincipal.userRoles
    console.log("setting role: " + roles)
    this.setRole(roles)

    var token = clientPrincipal.identityProvider + " " + clientPrincipal.userId
    console.log("Setting token: " + token)
    this.setToken(token)
  } catch (error) {
    console.error(error)
  }
},
methods: {
  ...mapActions(['setName']),
  ...mapActions(['setEmail']),
  ...mapActions(['setPhone']),
  ...mapActions(['setRole']),
  ...mapActions(['setToken']),
  GetUserInfo(){
  }
}
}
</script>

<style>

</style>
