<template>
    <div>
        <h2>Welcome {{ $store.state.name }}</h2>
        <div>{{ $store.state.email }}</div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Profile',
  data () {
    return {
      claims: []
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
  },
  methods: {
    ...mapActions(['setName']),
    ...mapActions(['setEmail'])
  }
}
</script>

<style>

</style>