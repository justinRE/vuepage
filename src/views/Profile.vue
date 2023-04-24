<template>
  <div>
      <h2>Welcome {{ $store.state.email }}</h2>
<!--  <div>{{ $store.state.phone }}</div>-->
      <div>{{ $store.state.role[0] }}</div>

      <h3>You are on your way to earning rewards with Collide Coffee!</h3>
      Click on Punch Card to view your card and rewards.

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
    const token = response.data.authenticationToken

    // Make request to Graph API to retrieve phone number
    const graphResponse = await axios.get('https://graph.microsoft.com/v1.0/me?$select=mobilePhone', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })

    const phone = graphResponse.data.mobilePhone
    console.log("setting phone: " + phone)
    this.setPhone(phone)

    var email = userDetails
    console.log("setting email: " + email)
    this.setEmail(email)

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
