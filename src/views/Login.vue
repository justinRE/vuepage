<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-6 col-lg-4">
                <h1 class="text-center mb-3">Login</h1>
                <form>
                    <div class="form-group">
                        <label for="username">First/Last Name</label>
                        <input type="text" class="form-control" id="username" name="username" v-model="input.username" placeholder="First/Last Name" />
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="password" v-model="input.password" placeholder="Password" />
                    </div>
                    <button type="button" class="btn btn-primary btn-block" v-on:click="login()">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                if(this.input.username != "" && this.input.password != "") {
                    // This should actually be an api call not a check against this.$parent.mockAccount
                    if(this.input.username == this.$parent.mockAccount.username && this.input.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: "Customers" });
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
