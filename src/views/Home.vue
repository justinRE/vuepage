<template>
   <div style="text-align: center; padding:0% 20% 20% 20%">
    <h3>Collide Loyalty Program</h3>
    At Collide, we invite everyone to be a part of the good. For us, that means supporting community empowerment in the countries where our coffee comes from. 
    
    We donate 10% of every purchase toward local-led healthcare programs in underdeveloped communities in the Dominican Republic. By supporting Collide, you’re providing affordable, Dominican-led health and dental care to women, men, and children who would not otherwise receive care.
    {{ headerColor }}
    {{ headerTitleColor }}
    {{ VUE_APP_KEY }}
  </div>
</template>

<script>

export default{
  name: 'Home',
  data(){

  },
  mounted(){
    const headerColor = process.env.HEADER_COLOR;
    const headerTitleColor =  process.env.HEADER_TITLE_COLOR;
    const VUE_APP_KEY = process.env.VUE_APP_KEY;
  }
}
</script>