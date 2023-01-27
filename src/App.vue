<script setup>
import HelloWorld from './components/CTGhead.vue'
import PostPreviews from './components/PostPreviews.vue'
import Navbar from './components/Navbar.vue';
import { MqResponsive } from "vue3-mq";

</script>


<template>
<Navbar />
  <MqResponsive target = "phone">
  
  <header>
    <img alt="Catstagram Logo" class="logo" src="./assets/images/darkmodeCat.png"/>
    <div class="wrapper">
      <HelloWorld msg="Catstagram" />
    </div>
  </header> 
  <main>
    <PostPreviews/>
  </main>
  </MqResponsive>


<MqResponsive :target = '["tablet", "desktop", "laptop"]'>
  <!-- <Navbar /> -->
  <header class="desktopHeader">
    <img alt="Catstagram Logo" class="logo-desktop" src="./assets/images/darkmodeCat.png"/>
    <div class="wrapper">
      <HelloWorld msg="Catstagram" />
    </div>
  </header> 
  <main>
    <PostPreviews/>
  </main>
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
header {
  line-height: 1.5;
  /* background-color: aqua; */
}

.logo {
  display: block;
  margin: 0 auto 3vw;
  margin-top:10vw;
  width:75%
}

.logo-desktop{
  /* background-color: aqua; */
  width:20%;
  margin: 0 auto;
  display: block;
  
}
.desktopHeader{
  margin-top: 50px;
}
</style>
