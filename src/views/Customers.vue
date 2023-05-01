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
              <button class="btn btn-danger" @click="confirmDeleteCustomer(customerData.customerEmail)">Delete</button>
              <button class="btn btn-success" @click="punchCustomerCard(customerData.customerEmail)">Punch</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import axios from 'axios';
import store from '../store'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.use(VueToast);

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
      axios.get(`${store.state.apim}/GetAllCustomers`, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      }
).then(response => {
        this.customerData = Object.values(response.data);
      }).catch(err => {
        console.log(err);
      });
    },

    deleteCustomer(index) {
      // Check if customerData array is not empty
      if (this.customerData.length > 0) {
        const customerData = Object.values(this.customerData)[index];
        // Check if customerData at index is defined
        if (customerData) {
          const customerId = customerData.id; // Use customer ID directly from customerData array

          this.$confirm(`Are you sure you want to delete ${customerData.customerEmail}?`, 'Delete', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            type: 'warning'
          }).then(() => {
            axios.delete(`${store.state.apim}/DeleteCustomer/${customerId}`, {
              headers: {
                'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
              }
            }).then(() => {
              // remove the customer data from the table
              this.customerData.splice(index, 1);
              this.$toast.open({
                message: 'Customer successfully deleted',
                type: 'success'
              });
            }).catch(error => {
              console.error(error);
            });
          }).catch(() => {
            // Do nothing if the user cancels the delete operation
          });
        } else {
          console.error(`Customer data at index ${index} is undefined`);
        }
      } else {
        console.error('Customer data array is empty');
      }
},

async punchCustomerCard(index) {
  const customerData = Object.values(this.customerData)[index];
  const getresponse = await axios.get(`${store.state.apim}/PunchCustomerCard/${customerData.customerEmail}`, {
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
    }
  });
  this.$toast.open({
    message: 'Customer card punched successfully',
    type: 'success'
  });
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