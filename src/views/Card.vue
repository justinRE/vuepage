<template>
  <div class="punch-card">
    <h1>Punch card</h1>
   

        <div class="card-wrapper">
            <div id="card-1" :class="['card', 'card-rotating', {'is-flipped': flipped}]">
              <div class="face front">

              <!-- Image-->
              <div class="card-up">
                <div class="punch-row">
          <img class="left-cap img-fluid" :src="require('@/assets/leftend.png')" />
          <img
            v-for="(punch, index) in 5"
            :key="index"
            :src="require('@/assets/BeanCard.png')"
            :class="{ punched: index < punches }"
          />
          <img class="right-cap img-fluid" :src="require('@/assets/rightEnd.png')" />
        </div>

        <div class="punch-row">
          <img class="left-cap img-fluid" :src="require('@/assets/leftend.png')" />
          <img
            v-for="(punch, index) in 4"
            :key="index + 4"
            :src="require('@/assets/BeanCard.png')"
            :class="{ punched: index + 5 < punches }" />

          <img
            class="cup img-fluid"
            :src="require('@/assets/CupCard.png')"
            :class="{ punched: punches >= 10 }" />
          <img class="right-cap img-fluid" :src="require('@/assets/rightEnd.png')" />
        </div>

          </div>

          <!-- Content -->
          <div class="card-body">
            <h4 class="font-weight-bold mb-3">Number of Free Drinks: {{ freeDrinks }}</h4>
            <!-- button -->
          </div>
          <a class="rotate-btn" @click="flipped = true">Click here to switch to QR code</a>
          </div>
          <div class="face back">
          <div class="card-body">

            <!-- Content -->
            <p>
              <form>
                <input type="text" v-model="QRValue">
              </form>
              <qrcode-vue :value="QRValue" :size="300" level="H" />
              <a class="rotate-btn" @click="flipped = false">Click here to switch to Punch Card</a>
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
import { mapState } from 'vuex'
import axios from 'axios';

export default {
  components:{
    QrcodeVue
  },
  name: "PunchCard",
  data() {
    return {
      punches: 0,
      freeDrinks: 2,
      flipped: false,
      QRValue: "12345",
    }
  },
  methods: {
    addPunch() {
      this.punches++;
    },
  },
  async created() {
    try {
      var cusName = encodeURIComponent(this.userName);
      const response = await axios.get(`https://collidegateway.azure-api.net/GetCustomerByName/${cusName}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      })  
      this.punches = response.data[0].customerPunches
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    ...mapState(['userName'])
  }
};
</script>

<style lang="css">
.punch-card {
  align-items: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.punch-row {
  display: flex;
  align-items: center;
}

.punch-row img {
  width: 50px;
  height: 50px;
  margin-top: -1px;
  margin-left: -1px;
  margin-right: -1px;
}

.punched {
  opacity: 0.2;
}

.cup {
  width: 100px;
  height: 100px;
  margin-top: -1px;
  margin-left: -1px;
  margin-right: -1px;
}

.left-cap,
.right-cap {
  width: 20px;
  height: 50px;
  margin-right: -1px;
}

.drinks {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bolder;
  padding-top: 30px;
}

.card {
  position: relative;
  height: 500px;
  width: 340px;
  transform-style: preserve-3d;
  transition: transform 0.8s;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card .face {
  position: absolute;
  backface-visibility: hidden;
}

.card .back {
  transform: rotateY(180deg);
}

</style>
