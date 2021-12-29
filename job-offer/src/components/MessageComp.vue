<template>
  <div class="max-w-screen-xl mx-auto bg-indigo-600 " ref="msg">
    HAHA
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let fadeInAndOutAnime = [
  {
    opacity: 0,
    transform: `translateY(-20px)`
  },
  {
    opacity: 1
  },
  {
    opacity: 0,
    transform: `translateY(0)`,
    display: "none"
  }
]

let animeDuration = {
  duration: 2000,
  easing: "ease-in-out",
  iterations: 1
}

const msg = ref();

const isFinished = ref(false);

onMounted(()=>{
  const msgAnimate =  msg.value.animate(fadeInAndOutAnime, animeDuration);

  if(msgAnimate.playState === "finished"){
    isFinished.value = true;
    console.log(isFinished.value);
  }
})

</script>

<style scoped>

</style>
