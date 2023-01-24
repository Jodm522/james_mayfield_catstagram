<script setup>
import HelloWorld from './components/CTGhead.vue'
import PostPreviews from './components/PostPreviews.vue'
import Navbar from './components/Navbar.vue';

// import { useDark, useToggle  } from "@vueuse/core";
// const isDark = useDark({
//   selector: "div", //element to add attribute to
//   attribute: "class", // attribute name
//   valueDark: "custom-dark", // attribute value for dark mode
//   valueLight: "custom-light", // attribute value for light mode
// });
// const toggleDark = useToggle(isDark);
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
