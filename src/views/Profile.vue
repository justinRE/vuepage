<template>
  <div>
      <h2>Welcome {{ $store.state.name }}</h2>
      <div>{{ $store.state.email }}</div>
<!--  <div>{{ $store.state.phone }}</div>-->
      <div>{{ $store.state.role[0] }}</div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios';

export default {
name: 'Profile',
data () {
  return {
    claims: []
    }
},
async created () {
  try {
    const response = await axios.get('/.auth/me')
    .then(response => (this.info = response))
    const clientPrincipal = response.data.clientPrincipal
    const userDetails = clientPrincipal.userDetails

    var name = userDetails
    console.log("setting name: " + name)
    this.setName(name)

    var email = userDetails
    console.log("setting email: " + email)
    this.setEmail(email)

    //var phone = "502-802-6596"
    //console.log("setting phone [mocked]: " + phone)
    //this.setPhone(phone)

    var roles = clientPrincipal.userRoles
    console.log("setting role: " + roles)
    this.setRole(roles)
  } catch (error) {
    console.error(error)
  }
},
methods: {
  ...mapActions(['setName']),
  ...mapActions(['setEmail']),
  //...mapActions(['setPhone']),
  ...mapActions(['setRole']),
  GetUserInfo(){
  }
}
}
</script>

<style>

</style>
