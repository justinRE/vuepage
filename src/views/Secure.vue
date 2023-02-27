<template>
  <div class="secure">
    <h1>Punch card</h1>
    <img src="coffeecard.jpeg"></img>
  </div>
</template>

<script>
    export default {
        name: 'Secure',
        data() {
          return {}
        },
        mounted() {
            if(!this.$parent.authenticated) {
                this.$router.replace({ name: "Login" });
            }
        },
        methods: {
        }
    }
</script>

<style lang="css">
</style> 