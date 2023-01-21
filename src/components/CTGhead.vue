<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="CTGtitle">{{ msg }}</h1>
    <h3>
     An efficient way to waste some time. 
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 12vw;
  top: -10vw;
}

h3 {
  font-size: 5vw;
  /* top: -8vw; */
}

.greetings h1,
.greetings h3 {
  text-align: center;
  height: 9vw;
}


.CTGtitle{
  color: rgb(218, 98, 13);
}
</style>
