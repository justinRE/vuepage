<template>
  <div id="register">
      <h1>Register</h1>
      <div class="form-container">
        <div class="form-inputs">
            <label for="username">First/Last Name</label>
            <input type="text" id="username" name="username" v-model="input.username" placeholder="First/Last Name" />
        </div>
        <div class="form-inputs">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="input.password" placeholder="Password" />
        </div>
        <div class="form-inputs">
            <label for="phone">Phone Number</label>
            <input type="phone" id="phone" name="phone" v-model="input.phone" placeholder="Phone Number" />
        </div>
        <div class="form-inputs">
            <label for="email">Email Address</label>
            <input type="email" id="email" name="email" v-model="input.email" placeholder="Email Address" />
        </div>
      </div>
      <button type="button" v-on:click="register()">Register</button>
      <div>
        <label>{{message}}</label>
      </div>
  </div>
</template>

<script>
//probably want validation in another file
const validateName = username => {
  if (!username.length) {
    return { valid: false, error: "This field is required" };
  }
  return { valid: true, error: null };
};

const validatePhone = phone => {
  if (!phone.length) {
    return { valid: false, error: 'This field is required.' };
  }

  if (!phone.match(/^[+][(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,7}$/gm)) {
    return { valid: false, error: 'Please, enter a valid international phone number.' };
  }

  return { valid: true, error: null };
}

const validateEmail = email => {
  if (!email.length) {
    return { valid: false, error: "This field is required" };
  }
  if (!email.match(/^\w+([.-]?\w+)_@\w+(_[_.-]?\w+)_(.\w{2,3})+$/)) {
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
        name: 'Register',
        data() {
            return {
                input: {
                    username: "",
                    password: "",
                    phone: "",
                    email: ""
                },

            }
        },
        methods: {
            register() {
              if(this.input.phone !== "" && this.input.email !== "") {
                // create a user object with the input values
                const user = {
                  username: this.input.username,
                  password: this.input.password,
                  phone: this.input.phone,
                  email: this.input.email
                };
                // add the user object to the array of registered users
                this.users.push(user);
                console.log("Registration successful");
                message = "Registration successful";
              }
              else {
                console.log("Phone number/email must be present");
                message = "Phone number/email must be present"
              }

              this.errors = {}

              const validName = validateName(this.user.name);
              this.errors.name = validName.error;
              if (this.valid) {
                this.valid = validName.valid
              }

              const validPhone = validatePhone(this.user.phone);
              this.errors.phone = validPhone.error;
              if (this.valid) {
                this.valid = validPhone.valid
              }

              const validEmail = validateEmail(this.user.email);
              this.errors.email = validEmail.error;
              if (this.valid) {
                this.valid = validEmail.valid
              }

              const validPassword = validatePassword(this.user.password)
              this.errors.password = validPassword.error
              if (this.valid) {
                this.valid = validPassword.valid
              }

              if (this.valid) {
                alert('HURRAAYYY!! :-)\n\n' + JSON.stringify(this.user))
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
