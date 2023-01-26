<script setup>
import HelloWorld from './components/CTGhead.vue'
import PostPreviews from './components/PostPreviews.vue'
import Navbar from './components/Navbar.vue';


</script>


<template>
  <Navbar />
 
  <header>
    <img alt="Catstagram Logo" class="logo" src="./assets/images/darkmodeCat.png"/>
    <div class="wrapper">
      <HelloWorld msg="Catstagram" />
    </div>
  </header> 
  <!-- <button @click="toggleDark()">
    Toggle Color Mode
  </button> -->
  <main>
    <PostPreviews/>
  </main>
</template>


<script>

</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 3vw;
  margin-top:10vw;
  width:75%
}


</style>
