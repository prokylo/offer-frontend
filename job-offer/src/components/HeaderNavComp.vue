<template>
  <header class="h-24 min-w-full p-4 flex bg-white flex-wrap z-10 top-0"
    :class="props.isFixed? 'fixed' : ''"
  >
    <div class="self-center">
      <h2 class="text-4xl font-bold text-indigo-700 mx-8">牛小客</h2>
    </div>
    <nav class="flex items-center ml-auto mr-4">
      <div class="border-b-4 border-transparent hover:border-indigo-700 p-2">
        <a class="list-none mx-4 text-xl " href=""><router-link to="/jobs">HOME</router-link></a>
      </div>
      <div class="border-b-4 border-transparent hover:border-indigo-700 p-2">
        <a class="list-none mx-4 text-xl " href=""><router-link to="/community">COMMUNITY</router-link></a>
      </div>
      <div class="border-b-4 border-transparent hover:border-indigo-700 p-2">
        <a class="list-none mx-4 text-xl" href="">JOIN</a>
      </div>
      <div class="border-b-4 border-transparent hover:border-indigo-700 p-2">
        <a class="list-none mx-4 text-xl" href="">SUPPORT</a>
      </div>
    </nav>
    <button
        class="bg-indigo-700 border-2 rounded-lg place-self-center mr-1
          text-white py-3 px-6 justify-self-center shadow hover:bg-indigo-800 text-xl"
        :class="[ isLogin === null ? 'visible' : 'hidden']" @click="handleOpenLoginBox"
    >Sign In
    </button>
    <button :class="[ isLogin === null ? 'hidden' :'visible']" @click="handleOpenLoginBox">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </button>
  </header>
  <transition name="loginbox">
    <LoginBox
        v-if="showLoginBox"
        @click="showLoginBox = !showLoginBox"
    />
  </transition>

</template>

<script setup>
import { ref, onMounted } from "vue";
import LoginBox from './LoginBox.vue';

onMounted(()=>{
  console.log(props.isFixed)
})

const props = defineProps(["isFixed"]);

let isLogin = ref(sessionStorage.getItem('isLogin'));

//params and callbacks of login module
const showLoginBox = ref(false);
const emit = defineEmits(["click"]);

const handleOpenLoginBox = () => {
  showLoginBox.value = !showLoginBox.value
};

</script>

<style scoped>
  .loginbox-enter-from, .loginbox-leave-to{
    opacity: 0;
    transform: scale(0.1);
  }
  .loginbox-enter-active, .loginbox-leave-active{
    transition: all 1s ease;
  }
</style>
