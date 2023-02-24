<template>
  <div id="register">
      <h1>Register</h1>
      <div class="form-inputs">
          <label for="username">Username</label>
          <input type="text" id="username" name="username" v-model="input.username" placeholder="Username" />
      </div>
      <div class="form-inputs">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="input.password" placeholder="Password" />
      </div>
      <div class="form-inputs">
          <label for="phone_number">Phone Number</label>
          <input type="phone_number" id="phone_number" name="phone_number" v-model="input.phone_number" placeholder="phone number" />
      </div>
      <div class="form-inputs">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" v-model="input.email" placeholder="Email Address" />
      </div>
      <button type="button" v-on:click="register()">Register</button>
  </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            register() {
                if(this.input.username != "" && this.input.password != "") {
                    // This should actually be an api call not a check against this.$parent.mockAccount
                    if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "Secure" });
                    } else {
                        console.log("The username and / or password is incorrect");
                    }
                } else {
                    console.log("A username and password must be present");
                }
            }
        }
    }
</script>