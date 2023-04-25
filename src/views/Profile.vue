<template>
  <div>
    <div class="header1">
      <h2>Welcome {{ $store.state.email }}</h2>
    </div>
    <div>
      <h3>You are on your way to earning rewards with Collide Coffee!</h3>
          Click on Punch Card to view your card and rewards.
    </div>
    <div v-if="showRegistrationBox">
      <input v-model="phoneNumber" placeholder="Phone Number">
      <input v-model="name" placeholder="Name">
      <button @click="registerUser">Register</button>
    </div>
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
    showRegistrationBox: false,
    phoneNumber: '',
    name: ''
    }
},
async created () {
  try {
    const response = await axios.get('/.auth/me')
    .then(response => (this.info = response))
    const clientPrincipal = response.data.clientPrincipal
    const userDetails = clientPrincipal.userDetails

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
  GetUserInfo(){},
  checkRegistration() {

},
registerUser() {

  this.showRegistrationBox = false;
}
}
}
</script>

<style>
.header1 {
  margin-bottom: 50px;
}
</style>
