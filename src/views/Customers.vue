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
            <td v-if="!customerData.editing">{{ customerData.customerName }}</td>
            <td v-else><input v-model="customerData.editedName" type="text"></td>
            <td v-if="!customerData.editing">{{ customerData.customerEmail }}</td>
            <td v-else><input v-model="customerData.editedEmail" type="text"></td>
            <td v-if="!customerData.editing">{{ customerData.customerPhone }}</td>
            <td v-else><input v-model="customerData.editedPhone" type="text"></td>
            <td>
              <button class="btn btn-primary" @click="customerData.editing ? saveCustomer(index) : editCustomer(index)">
                {{ customerData.editing ? 'Save' : 'Edit' }}
              </button>
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
      axios.get(`${store.state.apim}/GetCustomer`, {
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


    editCustomer(index) {
  const customerData = Object.values(this.customerData)[index];
  if (customerData) {
    this.$set(customerData, 'editing', true);
    this.$set(customerData, 'editedName', customerData.customerName);
    this.$set(customerData, 'editedEmail', customerData.customerEmail);
    this.$set(customerData, 'editedPhone', customerData.customerPhone);
  } else {
    console.error(`Customer data at index ${index} is undefined`);
  }
},

saveCustomer(index) {
  const customerData = Object.values(this.customerData)[index];
  if (customerData) {
    customerData.customerName = customerData.editedName;
    customerData.customerEmail = customerData.editedEmail;
    customerData.customerPhone = customerData.editedPhone;

    const customerId = customerData.id; 
    const customerName = customerData.customerName; 
    const customerEmail = customerData.customerEmail; 
    const customerPhone = customerData.customerPhone; 

    //post customer will create a new customer which isn't what I want, I need a new method that works something like this. 
    axios.post(`https://collidegateway.azure-api.net/UpdateCustomer/${customerId}`, {
      name: customerName,
      email: customerEmail,
      phone: customerPhone
    }, {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
      }
    }).then(response => {
      console.log('Customer data updated successfully', response.data);
      // Set editing property to false to disable editing mode
      this.$set(customerData, 'editing', false);
    }).catch(error => {
      console.error('Failed to update customer data', error);
    });
  } else {
    console.error(`Customer data at index ${index} is undefined`);
  }
},
    deleteCustomer(index) {
      // Check if customerData array is not empty
      if (this.customerData.length > 0) {
        const customerData = Object.values(this.customerData)[index];
        // Check if customerData at index is defined
        if (customerData) {
          const customerId = customerData.id; // Use customer ID directly from customerData array

          axios.delete(`https://collidegateway.azure-api.net/DeleteCustomer/${customerId}`, {
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

    axios.post(`https://collidegateway.azure-api.net/UpdateCustomer/${customerId}`, {
      punches: customerPunches
    }, {
      headers: {
        'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
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