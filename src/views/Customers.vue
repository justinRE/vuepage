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
              <button class="btn btn-success" @click="punchCustomerCard(customerData.customerEmail)">Punch</button>
              <button class="btn btn-warning" @click="rewardCustomer(customerData.customerEmail)">Add Reward</button>
              <button class="btn btn-danger" @click="deleteCustomer(customerData.customerEmail)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <confirm-dialogue ref="ConfirmDialogue"></confirm-dialogue>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store';
import 'vue-toast-notification/dist/theme-sugar.css';
import ConfirmDialogue from '../components/ConfirmDialogue.vue'

export default {
  components: {ConfirmDialogue},
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

   async deleteCustomer(email) {
    const ok = await this.$refs.ConfirmDialogue.show({
                title: 'Delete Customer',
                message: `Are you sure you want to delete ${email}'s customer record forever? This cannot be undone.`,
                okButton: 'Delete Customer forever',
            })
            if (ok) {
      axios.delete(`${store.state.apim}/DeleteCustomer/${email}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      }).then(() => {
        const index = this.customerData.findIndex(c => c.customerEmail === email);
        this.customerData.splice(index, 1);
        this.$toast.open(`Customer ${email} has been deleted successfully`);
      }).catch(error => {
        console.error(error);
      })}
      else {
                alert('Customer not deleted.')
          }
    },

    async punchCustomerCard(email) {
      const ok = await this.$refs.ConfirmDialogue.show({
                title: 'Punch Card',
                message: `Are you sure you want to punch ${email}'s card?`,
                okButton: 'Punch Card',
            })
            if (ok) {
      axios.get(`${store.state.apim}/PunchCustomerCard/${email}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      }).then(() => {
        this.$toast.open('Card punched successfully');
      }).catch(error => {
        console.error(error);
      });
    }
    else {
                alert('Customer Card not punched.')
          }
    },


    async rewardCustomer(email) {
      const ok = await this.$refs.ConfirmDialogue.show({
                title: 'Reward Customer',
                message: `Are you sure you want to give ${email} a free reward?`,
                okButton: 'Give Reward',
            })
            if (ok) {
      axios.get(`${store.state.apim}/RewardCustomer/${email}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      }).then(() => {
        this.$toast.open('Customer was given a free reward');
      }).catch(error => {
        console.error(error);
      });
    }
    else {
                alert('Customer not given reward.')
          }
        },

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