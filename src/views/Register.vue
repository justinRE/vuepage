<template>
   <div style="text-align: center; padding:0% 20% 20% 20%">
    <h3>Collide Loyalty Program</h3>
    At Collide, we invite everyone to be a part of the good. For us, that means supporting community empowerment in the countries where our coffee comes from. 
    
    We donate 10% of every purchase toward local-led healthcare programs in underdeveloped communities in the Dominican Republic. By purchasing this bag, you’re providing affordable, Dominican-led health and dental care to women, men, and children who would not otherwise receive care.
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
                    email: "",
                },
                valid: true,
                success: false,
                errors:{},
                message: null,
                firstNameError:null,
                passwordError:null,
                phoneError:null,
                emailError:null,
                lastNameError:null,
                users: [],
                passwordVerifyError: null,
                verifyPassword: "",
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
              axios.post("https://https://collidegateway.azure-api.net/PostCustomer", user, {
                headers: {
                  'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
                }
              })
                .catch(err => {
                  console.log(err);
              });
              // need to change this to make sure post request was successful first
              this.message = 'Registration successful';
              
            } else {
              this.message = 'Please fix the errors and try again.';  
              this.firstNameError = validFirstName.error;
              this.lastNameError = validLastName.error;
              this.passwordError = validPassword.error;
              this.phoneError = validPhone.error;
              this.emailError = validEmail.error;
            }

          },
            verifyPass() {
              if (this.password !== this.verifyPassword) {
                this.passwordVerifyError = 'Passwords do not match';
                return;
              }
      },
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
