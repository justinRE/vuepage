<template>
  <div id="register">
      <h1>Register</h1>
      <div class="form-container">
        <div class="form-inputs">
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" v-model="input.firstName" placeholder="First Name" />
        </div>
        <label>{{error1}}</label>
        <div class="form-inputs">
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" v-model="input.lastName" placeholder="Last Name" />
        </div>
        <label>{{error5}}</label>
        <div class="form-inputs">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="input.password" placeholder="Password" />
        </div>
        <label>{{error2}}</label>
        <div class="form-inputs">
            <label for="phone">Phone Number</label>
            <input type="phone" id="phone" name="phone" v-model="input.phone" placeholder="Phone Number" />
        </div>
        <label>{{error3}}</label>
        <div class="form-inputs">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" v-model="input.email" placeholder="Email Address" />
        </div>
        <label>{{error4}}</label> <br>
      </div>
      <button type="button" v-on:click="register()">Register</button>
      <div>
        <label>{{message}}</label> 
      </div>
  </div>
</template>



<script>
import axios from 'axios';

const validateFirstName = firstName => {
  if (!firstName.length) {
    return { valid: false, error: "This field is required" };
  }
  return { valid: true, error: null };
};

const validateLastName = lastName => {
  if (!lastName.length) {
    return { valid: false, error: "This field is required" };
  }
  return { valid: true, error: null };
};

const validatePhone = phone => {
  if (!phone.length) {
    return { valid: false, error: 'This field is required.' };
  }

  if (!phone.match(/^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,7}$/gm)) {
    return { valid: false, error: 'Please, enter a valid international phone number.' };
  }

  return { valid: true, error: null };
}

const validateEmail = email => {
  if (!email.length) {
    return { valid: false, error: "This field is required" };
  }
  if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.\w{2,3}$/)) {
    return { valid: false, error: "Please, enter a valid email." };
  }
  return { valid: true, error: null };
};

const validatePassword = password => {
  if (!password.length) {
    return { valid: false, error: "This field is required" };
  }
  if (password.length < 7) {
    return { valid: false, error: "Password is too short" };
  }
  return { valid: true, error: null };
};


    export default {
        name: 'register', 
        data() {
            return {
                input: {
                    firstName: "",
                    lastName: "",
                    password: "",
                    phone: "",
                    email: ""
                },
                valid: true,
                success: false,
                errors:{},
                message: null,
                error1:null,
                error2:null,
                error3:null,
                error4:null,
                error5:null,
                users: []
            }
        },

        methods: {
            register() {

              this.errors= {};

              const validFirstName = validateFirstName(this.input.firstName);
              this.errors.firstName = validFirstName.error;
              if (!validFirstName.valid) {
                  this.valid = false;
              }

              const validLastName = validateLastName(this.input.lastName);
              this.errors.lastName = validLastName.error;
              if (!validLastName.valid) {
                  this.valid = false;
              }

              const validPhone = validatePhone(this.input.phone);
              this.errors.phone = validPhone.error;
              if (this.valid) {
                this.valid = validPhone.valid
              }

              const validEmail = validateEmail(this.input.email);
              this.errors.email = validEmail.error;
              if (this.valid) {
                this.valid = validEmail.valid
              }

              const validPassword = validatePassword(this.input.password)
              this.errors.password = validPassword.error
              if (this.valid) {
                this.valid = validPassword.valid
              }
            

              if (this.valid) {
                //do nothing if valid
              }

            // Check if all fields are valid before registration
            const validFields = Object.values(this.errors).every((error) => !error);
            if (validFields) {
              const user = {
                name: this.input.firstName + ' ' + this.input.lastName,
                password: this.input.password,
                phone: this.input.phone,
                email: this.input.email,
              };
              
              axios.post("https://reiszfuncapim.azure-api.net/PostCustomer", user, {
                headers: {
                  'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
                }
              })
                .catch(err => {
                  console.log(err);
              });
              this.message = 'Registration successful';
              
            } else {
              this.message = 'Please fix the errors and try again.';  
              this.error1 = validFirstName.error;
              this.error5 = validLastName.error;
              this.error2 = validPassword.error;
              this.error3 = validPhone.error;
              this.error4 = validEmail.error;
            }

          }
      }
    }
</script>

<style>
#register .form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#register .form-inputs {
  padding-bottom: 10px;
}

#register .form-inputs label {
  padding-right: 10px;
}

</style>
