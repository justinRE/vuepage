<template>
  <div class="punch-card">
    <h1>Punch card</h1>
   

    <div class="card-wrapper" @click="flipped = !flipped">
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
            <div class="hint" v-if="!flipped">Click anywhere to flip</div> <!-- Add this line for hint -->
          </div>
          </div>
          <div class="face back">
          <div class="card-body">

            <!-- Content -->
            <p>
              <qrcode-vue :value="userEmail" :size="300" level="H" />
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import store from '../store'
import QrcodeVue from 'qrcode.vue'
import axios from 'axios';

export default {
  components:{
    QrcodeVue
  },
  name: "PunchCard",
  data() {
    return {
      punches: 0,
      freeDrinks: 0,
      flipped: false,
      email: store.state.email,
      site: store.state.site,
      userEmail: ''
    }
  },
  methods: {
    addPunch() {
      this.punches++;
    },
  },
  async created() {
    try {
      var cusEmail = encodeURIComponent(this.email)
      console.log(cusEmail)
      const response = await axios.get(`https://${store.state.apim}/GetCustomerPunches/${cusEmail}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      })  
      this.punches = response.data.punchNumber;
      //console.log("Response: " + JSON.stringify(response))
      this.userEmail = this.email;
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    initialFreeDrinks() {
      const freeDrinks = Math.floor(this.cardPunches / 10);
      return freeDrinks < 1 ? 0 : freeDrinks;
    }
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
  filter:brightness(30%)
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
