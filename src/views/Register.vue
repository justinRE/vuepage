<template>
  <div id="register" class="container">
      <h1 class="text-center mb-5">Register</h1>
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <form>
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control" id="firstName" name="firstName" v-model="input.firstName" placeholder="First Name" />
              <div class="invalid-feedback">{{error1}}</div>
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input type="text" class="form-control" id="lastName" name="lastName" v-model="input.lastName" placeholder="Last Name" />
              <div class="invalid-feedback">{{error5}}</div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" name="password" v-model="input.password" placeholder="Password" />
              <div class="invalid-feedback">{{error2}}</div>
            </div>
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="phone" class="form-control" id="phone" name="phone" v-model="input.phone" placeholder="Phone Number" />
              <div class="invalid-feedback">{{error3}}</div>
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" class="form-control" id="email" name="email" v-model="input.email" placeholder="Email Address" />
              <div class="invalid-feedback">{{error4}}</div>
            </div>
            <button type="button" class="btn btn-primary" v-on:click="register()">Register</button>
          </form>
          <div class="mt-3">
            <label>{{message}}</label> 
          </div>
        </div>
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
