<template>
<div class="bg-gray-50 px-8">
    <qrcode-stream @init="onInit"></qrcode-stream>
</div>
</template>

<script>
import {QrcodeStream} from 'vue-qrcode-reader'

export default{
    components: {
        QrcodeStream
    }
}
</script>

<style>

</style>