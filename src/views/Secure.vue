<template>
  <div class="Punch card">
    <h1>Punch card</h1>
    <img :src="require('@/assets/coffeecard.jpeg')" />
  </div>
</template>

<validate-jwt header-name="Authorization" failed-validation-httpcode="401" failed-validation-error-message="Unauthorized. Access token is missing or invalid.">
  <openid-config url="https://login.microsoftonline.com/{aad-tenant}/v2.0/.well-known/openid-configuration" />
  <required-claims>
      <claim name="aud">
          <value>144775ae-a710-470c-b465-50fa7a3a227f</value>
      </claim>
  </required-claims>
</validate-jwt>

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