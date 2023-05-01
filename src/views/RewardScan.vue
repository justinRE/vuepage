<template>
    <container>
        <p> Scan Punches</p>
    <p>{{ error }}</p>
    <p> {{ decodedString }}</p>
<qrcode-stream @init="onInit" @decode="onDecode"> </qrcode-stream>
<button @click="torch=!torch">Toggle device flashlight</button>
    </container>
</template>

<script>
import {QrcodeStream} from 'vue-qrcode-reader'
import { mapState } from 'vuex'
import store from '../store'

export default {
    data(){
        return{
            error: '',
            decodedString: '',
            torch: false,
            cusEmail: store.state.Email
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
            this.decodedString = decodedString;
            axios.post(`${store.state.apim}/ClaimReward/${cusEmail}`, { punchData: decodedString })
                .then(response => {
                this.error = 'Scanned successfully';
                })
                .catch(error => {
                this.error = 'Failed to add punch';
                });
        },


    }
}
</script>

<style>

</style>