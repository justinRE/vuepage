<template>
    <div id="forgot">
        <h1>Forgot password</h1>
        <div class="form-inputs">
            <label for="username">First/Last Name</label>
            <input type="text" id="username" name="username" v-model="input.username" placeholder="First/Last Name" />
         </div>
        <button type="button" v-on:click="forgot()">Reset Password</button>
    </div>
</template>

<script>
export default {
    name: 'forgot',
    data() {
        return {
            input: {
                username: "",
            }
        }
    },
    methods: {
        forgot() {

            }
        }
    }
</script>

<style>
#forgot .form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#forgot .form-inputs {
  padding-bottom: 10px;
}

#forgot .form-inputs label {
  padding-right: 10px;
}

</style>

