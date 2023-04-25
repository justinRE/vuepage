<template>
  <div>
      <h2>Welcome {{ $store.state.email }}</h2>
<!--  <div>{{ $store.state.phone }}</div>-->
      <div>{{ $store.state.role[0] }}</div>

      <h3>You are on your way to earning rewards with Collide Coffee!</h3>
      Click on Punch Card to view your card and rewards.

      {{ info }}

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
    .then(response => (this.info = response))
    const clientPrincipal = response.data.clientPrincipal
    const userDetails = clientPrincipal.userDetails

    const accessToken = this.$route.headers['x-ms-token-aad-access-token'];
    const graphResponse = await axios.get('https://graph.microsoft.com/v1.0/me?$select=mobilePhone', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

    var email = userDetails
    console.log("setting email: " + email)
    this.setEmail(email)

    var phone = "502-802-6596"
    console.log("setting phone [mocked]: " + phone)
    this.setPhone(phone)

    var roles = clientPrincipal.userRoles
    console.log("setting role: " + roles)
    this.setRole(roles)
  } catch (error) {
    console.error(error)
  }
},
methods: {
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
