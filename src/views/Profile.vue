<template>
    <div>
        <h2>Welcome {{ $store.state.name }}</h2>
        <div>{{ $store.state.email }}</div>
        <div>{{ $store.state.phone }}</div>
        <div>{{ $store.state.role }}</div>
        <button @click="GetUserInfo"> {{ UserInfo }}</button>
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
      UserInfo: []
    }
  },
  async created () {
    const idToken = await this.$auth.tokenManager.get('idToken')
    this.claims = await Object.entries(idToken.claims).map(entry => ({ claim: entry[0], value: entry[1] }))

    var name = this.claims.find(claim => claim.claim === 'name').value
    console.log("setting name: " + name)
    this.setName(name)

    var email = this.claims.find(claim => claim.claim === 'email').value
    console.log("setting email: " + email)
    this.setEmail(email)

    var phone = "502-802-6596"
    console.log("setting phone [mocked]: " + phone)
    this.setPhone(phone)

    var token = this.claims.find(claim => claim.claim === 'nonce').value
    console.log("Setting token: " + token)
    this.setToken(token)
  },
  methods: {
    ...mapActions(['setName']),
    ...mapActions(['setEmail']),
    ...mapActions(['setPhone']),
    ...mapActions(['setToken']),
    GetUserInfo(){
    }
}
  }
</script>

<style>

</style>