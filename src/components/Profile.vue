<template>
  <div>
    <p>Welcome, {{ userName }}!</p>
    <p>Welcome, {{ userId }}!</p>
    <table>
      <thead>
        <tr>
          <th>Claim</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(claim, index) in claims"
          :key="index"
        >
          <td>{{claim.claim}}</td>
          <td :id="'claim-' + claim.claim">{{claim.value}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<template>
  <table>
    <thead>
      <tr>
        <th>Claim</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(claim, index) in claims" :key="index">
        <td>{{claim.claim}}</td>
        <td :id="'claim-' + claim.claim">{{claim.value}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
      claims: []
    }
  },
  async created() {
    const idToken = await this.$auth.tokenManager.get('idToken')
    this.claims = await Object.entries(idToken.claims).map(entry => ({ claim: entry[0], value: entry[1] }))
    this.setUserName(this.claims.find(claim => claim.claim === 'name').value)
    this.setUserId(this.claims.find(claim=> claim.claim === 'id').value)
  },
  methods: {
    ...mapActions(['setUserName']),
    ...mapActions(['setUserId'])
  }
}
</script>


