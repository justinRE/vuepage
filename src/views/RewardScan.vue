<template>
    <container>
        <h1> Redeem Customer Rewards</h1>
<qrcode-stream @init="onInit" @decode="onDecode"> </qrcode-stream>
<button @click="torch=!torch">Toggle device flashlight</button>
    </container>
</template>

<script>
import axios from 'axios';
import {QrcodeStream} from 'vue-qrcode-reader'
import 'vue-toast-notification/dist/theme-sugar.css';
import store from '../store'

export default {
    data(){
        return{
            error: '',
            decodedString: '',
            torch: false,
            cusEmail: null
        }
    },
    components:{
        QrcodeStream
    },
    methods:{
        async onInit( promise ){
            try {
            const { capabilities } = promise

            } catch (error) {
            if (error.name === 'NotAllowedError') {
                this.error = 'user denied camera access permisson'
            } else if (error.name === 'NotFoundError') {
                this.error = 'no suitable camera device installed'
            } else if (error.name === 'NotSupportedError') {
                this.error = 'page is not served over HTTPS (or localhost)'
            } else if (error.name === 'NotReadableError') {
                this.error = 'camera is already in use'
            } else if (error.name === 'OverconstrainedError') {
                this.error = 'did you requested the front camera although there is none?'
            } else if (error.name === 'StreamApiNotSupportedError') {
                this.error = 'browser seems to be lacking features'
            }
            } finally {
            // hide loading indicator
            }
        },
        onDecode(decodedString) {
            this.decodedString = decodedString
            axios.get(`${store.state.apim}/ClaimReward/${decodedString}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      })
                .then(response => {
                this.error = 'Scanned successfully';
                this.$toast.open(`${decodedString} Card punched successfully`)
                })
                .catch(error => {
                this.error = 'Failed to add punch';
                });
        },


    }
}
</script>

<style>
.main-container {
  width: 80%;
  margin: 0 auto;
}
</style>