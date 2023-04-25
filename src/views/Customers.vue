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
              <button class="btn btn-danger" @click="deleteCustomer(index)">Delete</button>
              <button class="btn btn-success" @click="punchCustomer(index)">Punch</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import store from '../store'

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

          axios.delete(`${store.state.apim}/DeleteCustomer/${customerId}`, {
            headers: {
              'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
            }
          }).then(() => {
            // remove the customer data from the table
            this.customerData.splice(index, 1);
          }).catch(error => {
            console.error(error);
          });
        } else {
          console.error(`Customer data at index ${index} is undefined`);
        }
      } else {
        console.error('Customer data array is empty');
      }
},

punchCustomer(index) {
  const customerData = Object.values(this.customerData)[index];
  if (customerData) {
    if (customerData.hasOwnProperty('customerPunches')) {
      // If customerData has 'customerPunches' property, increase the number of punches by 1
      customerData.customerPunches++;
    } else {
      // If customerData does not have 'customerPunches' property, add it with value 1
      this.$set(customerData, 'customerPunches', 1);
    }
    const customerId = customerData.id; 
    const customerPunches = customerData.customerPunches; 

    axios.post(`${store.state.apim}/UpdateCustomer/${customerId}`, {
      punches: customerPunches
    }, {
      headers: {
        'Ocp-Apim-Subscription-Key':process.env.VUE_APP_KEY
      }
    }).then(response => {
      console.log('Customer punches updated successfully', response.data);
    }).catch(error => {
      console.error('Failed to update customer punches', error);
    });
  } else {
    console.error(`Customer data at index ${index} is undefined`);
  }
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