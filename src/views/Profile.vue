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
        <input type="text" id="firstName" v-model="firstName">
        <br>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="lastName">
        <br>
        <label for="phone">Phone:</label>
        <input type="text" id="phone" v-model="phone">
        <br>
        <button type="button" @click="registerUser">Complete Registration</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios';
import store from '../store'

export default {
name: 'Profile',
data () {
  return {
    claims: [],
    showRegistrationBox: false,
    phone: '',
    firstName: '',
    lastName: '',
    type: ''
    }
},
async created () {
  try {
    console.log("Created executed")
    if (window.location.origin == "http://localhost:8080/"){
      const debug = true;
      const localCustomer = '[{"id":"6d819433-e471-4df6-9b82-e99bd26af89e","Type":"CUSTOMER","customerName":"Wesley Reisz","customerEmail":"Joem@wesleyreisz.com","customerPhone":"502-802-2361","_rid":"qbUlAIdv1-cBAAAAAAAAAA==","_self":"dbs/qbUlAA==/colls/qbUlAIdv1-c=/docs/qbUlAIdv1-cBAAAAAAAAAA==/","_etag":"\"32048390-0000-0700-0000-643d94830000\"","_attachments":"attachments/","_ts":"1681757315"}]';
      console.log("debug:" + debug); 
      this.setEmail(localCustomer.customerEmail); 
      this.setRole("anonymous")
    }
    else{
      const debug = false;
      const response = await axios.get('/.auth/me')
      .then(response => (this.info = response))
      const clientPrincipal = response.data.clientPrincipal

      const email = clientPrincipal.userDetails
      console.log("setting email: " + email)
      this.setEmail(email)

      var roles = clientPrincipal.userRoles
      console.log("setting role: " + roles)
      this.setRole(roles)

      await this.checkRegistration();
    }

  } catch (error) {
      console.error(error)
  }
},
async mounted(){
  console.log("Mounted executed")



},
methods: {
  ...mapActions(['setEmail']),
  ...mapActions(['setPhone']),
  ...mapActions(['setRole']),
  GetUserInfo(){},

  async checkRegistration() {
      const cusEmail = this.$store.state.email;
      let getresponse;
      try{
        getresponse = await axios.get(`${store.state.apim}/GetCustomerByEmail/${cusEmail}`, {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
          }
        });
        console.log("Customer already exists in Cosmos DB");

          let customer = debug ? localCustomer : getresponse.data.customer;
          if (customer && (!customer.CustomerName || !customer.CustomerPhone)) {
            console.log("Customer document does not include name and phone");
            this.showRegistrationBox = true;
          }

      } catch (err) {
        console.error(err.response.data);
        console.error("status error:" + err.response.status);
        console.error(err.response.headers); 
        if (err.response.status = 404) {
        // If customer does not exist, add them to Cosmos DB
        const postResponse = await axios.post(`${store.state.apim}/PostCustomer`, {
          email: cusEmail
        }, {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
          }
        });
        console.log("Customer added to Cosmos DB");
        // Show registration box if customer is newly created
        this.showRegistrationBox = true;
      }
      }
    },

  async registerUser() {
    console.log("registerUser")
    const cusEmail = this.$store.state.email;
    const customerName = this.firstName + ' ' + this.lastName;
    const customerPhone = this.phone;
    console.log("Phone:" + customerPhone)
    console.log("Name:" + customerName)
    console.log("Email:" + cusEmail)

      try {
    const postResponse = await axios.post(`${store.state.apim}/PostCustomer`, {
      email: cusEmail,
      name: customerName,
      phone: customerPhone
    }, {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
      }
    });
    console.log("Customer added to Cosmos DB");
    // this.showRegistrationBox = false;
  } catch (error) {
    console.error(error);
  }
}
}
}


</script>

<style>
.header1 {
  margin-bottom: 50px;
}
</style>
