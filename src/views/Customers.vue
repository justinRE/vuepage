<template>
      <div class="table-wrapper">
    <table>
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
            <button @click="editCustomer(customerData)">Edit</button>
            <button @click="deleteCustomer(customerData)">Delete</button>
            <button @click="punchCustomer(customerData)">Punch</button>
          </td>
        </tr>
      </tbody>
    </table>
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
            axios.get("https://reiszfuncapim.azure-api.net/GetCustomer", {
                    headers: {
                    'Ocp-Apim-Subscription-Key': 'key'
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
    mounted() {
        this.Customers();
        if(!this.$parent.authenticated) {
                this.$router.replace({ name: "Login" });
            }
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