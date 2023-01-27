<script setup>
import { MqResponsive } from "vue3-mq";
defineProps({
  msg: {
    type: String,
    required: true
  }
})

</script>
<template>
 <MqResponsive target = "phone">
  <div class="greetings">
    <h1 class="CTGtitle">{{ msg }}</h1>
    <h3 class="phoneTagline">
     An efficient way to waste some time. 
    </h3>
  </div>
  </MqResponsive>
  <MqResponsive :target = '["laptop","desktop","tablet"]'>
  <div class="greetings-desktop">
    <h1 class="CTGtitle-desktop">{{ msg }}</h1>
    <h3 class="desktopTagline">
     An efficient way to waste some time.
    </h3>
  </div>
  </MqResponsive>
</template>


<script>
export default{
  components:{
    MqResponsive
  }
}
</script>
<style scoped>
.CTGtitle {
  font-weight: 500;
  font-size: 12vw;
  top: -10vw;
}

.phoneTagline {
  font-size: 5vw;
}

.greetings h1,
.greetings h3 {
  text-align: center;
  height: 9vw;
}


.CTGtitle{
  color: rgb(218, 98, 13);
}

.CTGtitle-desktop{
  color: rgb(218, 98, 13);
  font-size: 4vw;
  display: flex;
  justify-content: center;
}
.greetings-desktop{
  text-align: center;
}

.desktopTagline {
  text-align: center;
font-size: 5vh;
}
</style>
