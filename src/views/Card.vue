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
          <div v-for="(index) in 5"  :key="index" >
            <img v-if="punches>=index" :src="require('@/assets/bean-punch-white.png')" />
            <img v-else :src="require('@/assets/BeanCard.png')" />
          </div>
         
          <img class="right-cap img-fluid" :src="require('@/assets/rightEnd.png')" />
        </div>

        <div class="punch-row">
          <img class="left-cap img-fluid" :src="require('@/assets/leftend.png')" />
          <div v-for="(index) in 4" :key="index + 4">
            <img v-if="punches>=index+5" :src="require('@/assets/bean-punch-white.png')">
            <img v-else :src="require('@/assets/BeanCard.png')" />
          </div>

          <div v-for="(index) in 1" :key="index">
            <!-- Ten is never reached with current GetPunches logic-->
          <img v-if="punches>=index+10" :src="require('@/assets/reward.png')">
          <img v-else :src="require('@/assets/CupCard.png')">
          </div>
          
          <img class="right-cap img-fluid" :src="require('@/assets/rightEnd.png')" />
          </div>
          </div>

          <!-- Content -->
          <div class="card-body">
            <!-- this doesn't include the drinks that have been claimed-->
            <h4 class="font-weight-bold mb-3">Free Drinks Available: {{ userRewards }}</h4>
            <div class="hint" v-if="!flipped">Click anywhere to flip</div>
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
      userEmail: '',
      userRewards: 0
    }
  },
  async created() {
    try {
      var cusEmail = encodeURIComponent(this.email)
      console.log(cusEmail)
      //This counts the number of punches%10 to populate the punch card
      const response = await axios.get(`${store.state.apim}/GetCustomerPunches/${cusEmail}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      })  
      this.punches = response.data.punchNumber;
      console.log("Response: " + JSON.stringify(response))
      this.userEmail = this.email;
    } catch (error) {
      console.error(error)
    }
    try{
      //This checks the customers information for sets of 10 punches that aren't claimed and gives rewards
      await axios.get(`${store.state.apim}/CheckReward/${cusEmail}`,{
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      })

    } catch (error) {
      console.error(error)
    }

    try {
      //This counts the numbr of rewards currently available
      const reply = await axios.get(`${store.state.apim}/RewardCount/${cusEmail}`,{
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.VUE_APP_KEY
        }
      })
      this.userRewards = reply.data;
    } catch (error) {
      console.error(error)
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
