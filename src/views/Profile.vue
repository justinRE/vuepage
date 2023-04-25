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
      <h3>Please complete registration to earn a free reward</h3>
      <form>
        <label for="firstName">First Name:</label>
        <input type="text" id="name" v-model="name">
        <br>
        <label for="lastName">Last Name:</label>
        <input type="text" id="name" v-model="name">
        <br>
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="phone">
        <br>
        <button type="submit">Complete Registration</button>
      </form>
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
    name: '',
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
    const cusEmail = this.$store.state.email;
    const response = axios.get(`${store.state.apim}/GetCustomerByEmail/${cusEmail}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      })
      console.log("Response: " + JSON.stringify(response))

      if (response.data.type === "CUSTOMER") {
    console.log("Customer already exists in Cosmos DB");
  } else {
    // If customer does not exist, add them to Cosmos DB
    const postResponse = axios.post(`${store.state.apim}/PostCustomer`, {
      email: cusEmail
    }, {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
      }
    });
    console.log("Customer added to Cosmos DB");
  }
},
},
async registerUser() {
  const cusEmail = this.$store.state.email;

  const postResponse = await axios.post(`${store.state.apim}/PostCustomer`, {
    email: cusEmail,
    name: this.name,
    phone: this.phone
  }, {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
    }
  });

  console.log("Customer added to Cosmos DB");

  // Hide the registration box
  this.showRegistrationBox = false;
},

}
</script>

<style>
.header1 {
  margin-bottom: 50px;
}
</style>
