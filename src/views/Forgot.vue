<template>
    <div class="container" id="forgot">
      <div class="row justify-content-center mt-5">
        <div class="col-md-6 col-lg-4">
          <h1 class="text-center mb-3">Forgot password</h1>
          <form>
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="text" id="email" name="email" v-model="input.username" class="form-control" placeholder="Email Address" />
            </div>
            <button type="button" v-on:click="forgot()" class="btn btn-primary btn-block">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  

<script>
export default {
    name: 'forgot',
    data() {
        return {
            input: {
                email: "",
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

