<script setup>
import HelloWorld from './components/CTGhead.vue'
import PostPreviews from './components/PostPreviews.vue'
import Navbar from './components/Navbar.vue';
// import MenuModal from './components/MenuModal.vue'
// import LoginSignupModal from "./components/LoginSignupModal.vue"
// import PostLogoutModal from './components/PostLogoutModal.vue';
import PostModal from './components/PostModal.vue';
</script>

<template>
  <Navbar />
  <!-- <PostModal :pk="2"/> -->
  <header>
    <img alt="Catstagram Logo" class="logo" src="./assets/images/darkmodeCat.png"/>
    <div class="wrapper">
      <HelloWorld msg="Catstagram" />
    </div>
  </header>
  <main>
    <PostPreviews/>
  </main>
</template>


<script>



export default{

}
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
