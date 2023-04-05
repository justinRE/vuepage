<template>
    <div class="container">
      <h1>Customer List</h1>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customerData, index) in Object.values(customerData)" :key="index">
              <td>{{ customerData.customerName }}</td>
              <td>{{ customerData.customerEmail }}</td>
              <td>{{ customerData.customerPhone }}</td>
              <td>
                <button class="btn btn-primary" @click="editCustomer(customerData)">Edit</button>
                <button class="btn btn-danger" @click="deleteCustomer(customerData)">Delete</button>
                <button class="btn btn-success" @click="punchCustomer(customerData)">Punch</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>


<script>
import axios from 'axios';

export default {
  name: 'Customers', 
  data() {
    return {
      customerData: [],
      message: null
    }
  },
  methods: {
    Customers() {
      axios.get("https://loyaltygateway.azure-api.net/GetCustomer", {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      }).then(response => {
        this.customerData = Object.values(response.data);
      }).catch(err => {
        console.log(err);
      });
    },
    editCustomer() {
      // handle edit button here
    },
    deleteCustomer() {
      // handle delete button here
    },
    punchCustomer() {
      // handle punch button here
    }
  },
  created() {
    this.Customers();
  }
}
</script>



<style lang="css">
.table-wrapper {
  display: block;
  margin: auto;
  width:30%;
}

table {
  border-collapse: collapse;
}

th, td {
  border: 1px solid black;
  padding: 8px;
}
</style>