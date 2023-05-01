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
import axios from 'axios';
import store from '../store';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import MessageBox from 'vue-messagebox';

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

    deleteCustomer(email) {
      axios.delete(`${store.state.apim}/DeleteCustomerByEmail/${email}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      }).then(() => {
        const index = this.customerData.findIndex(c => c.customerEmail === email);
        this.customerData.splice(index, 1);
        Vue.$toast.open(`Customer ${email} has been deleted successfully`);
      }).catch(error => {
        console.error(error);
      });
    },

    punchCustomerCard(email) {
      axios.get(`${store.state.apim}/PunchCustomerCard/${email}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      }).then(() => {
        Vue.$toast.open('Card punched successfully');
      }).catch(error => {
        console.error(error);
      });
    },

    confirmDeleteCustomer(email) {
      this.$confirm(`Are you sure you want to delete ${email}?`, {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.deleteCustomer(email);
      }).catch(() => {
        Vue.$toast.info('Action canceled by the user');
      });
    },
  },
  created() {
    this.Customers();
    Vue.use(VueToast);
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