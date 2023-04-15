<template>
    <div>
        <h2>Profile: Welcome</h2>
    </div>
</template>

<script>
import { mapState } from 'vuex'

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
    console.log("name: " + name)

    var email = this.claims.find(claim => claim.claim === 'email').value
    console.log("email: " + email)
  }
}
</script>

<style>

</style>