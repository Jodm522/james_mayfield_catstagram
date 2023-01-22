
<template>
  <Navbar />

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
import HelloWorld from './components/CTGhead.vue'
import PostPreviews from './components/PostPreviews.vue'
import Navbar from './components/Navbar.vue';

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
