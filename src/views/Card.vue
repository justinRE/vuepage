<template>
  <div class="punch-card">
    <h1>Punch card</h1>
    <div class="punch-row">
      <img class="left-cap" :src="require('@/assets/leftend.png')" />
      <img
        v-for="(punch, index) in 5"
        :key="index"
        :src="require('@/assets/BeanCard.png')"
        :class="{ punched: index < punches }"
      />
      <img class="right-cap" :src="require('@/assets/rightEnd.png')" />
    </div>

    <div class="punch-row">
      <img class="left-cap" :src="require('@/assets/leftend.png')" />
      <img
        v-for="(punch, index) in 4"
        :key="index + 4"
        :src="require('@/assets/BeanCard.png')"
        :class="{ punched: index + 5 < punches }" />

      <img
        class="cup"
        :src="require('@/assets/CupCard.png')"
        :class="{ punched: punches >= 10 }" />
      <img class="right-cap" :src="require('@/assets/rightEnd.png')" />
    </div>

    <div class="drinks">
      <label> Number of Free Drinks: {{ freeDrinks }} </label>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "PunchCard",
  data() {
    return {
      punches: 3,
      freeDrinks: 2,
    };
  },
  methods: {
    addPunch() {
      this.punches++;
    },
  },
};
</script>

<style lang="css">
.punch-card {
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


</style>
