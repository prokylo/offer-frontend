<template>
  <header class="h-24 min-w-full p-4 flex bg-white flex-wrap z-10 top-0"
    :class="props.isFixed? 'fixed' : ''"
  >
    <div class="self-center">
      <h2 class="text-4xl font-bold text-indigo-700 mx-8">牛小客</h2>
    </div>
    <nav class="flex items-center ml-auto mr-4 hidden lg:flex">
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
    <div class="hidden sm:flex ml-auto lg:ml-0">
      <button
          class="mr-6 bg-indigo-700 border-2 rounded-lg place-self-center
          text-white py-3 px-6 justify-self-center shadow hover:bg-indigo-800 text-xl"
          v-if="!isLogin" @click="handleOpenLoginBox"
      >Sign In
      </button>
    </div>
    <div class="flex relative ml-auto lg:ml-0 mr-4 lg:mr-0">
      <div class="flex">
        <button class="outline-none" v-if="isLogin" id="user-menu-button" aria-haspopup="true" aria-expanded="false" @click="activateAvatarMenu">
          <img :src="avatar" class="border-4 rounded-full h-12 w-12 hover:border-indigo-500" />
        </button>
      </div>
      <transition name="menu">
        <div class="origin-top-right absolute right-0 mt-16 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" v-if="isAvatarMenuActive" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" role="menuitem" tabindex="-1" id="user-menu-item-0" @click="handleRouteToProfile">Your Profile</a>

          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>

          <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" role="menuitem" tabindex="-1" id="user-menu-item-2" @click="handleLogout">Sign out</a>
        </div>
      </transition>
    </div>
  </header>
  <transition name="loginbox">
    <LoginBox
        v-if="showLoginBox"
        @click="showLoginBox = !showLoginBox"
        @submit="handleSubmit"
    />
  </transition>

</template>

<script setup>
import {ref, onMounted, watch, onBeforeMount} from "vue";
import { useRouter } from 'vue-router';
import LoginBox from './LoginBox.vue';

import avatar from '../assets/avatar.jpg'

const router = useRouter();

const isLogin = ref(false);
const isAvatarMenuActive = ref(false);

onBeforeMount(() => {
  const hasUserId = window.sessionStorage.getItem("user_id");
  if(hasUserId) {
    isLogin.value = true;
  }
})

onMounted(()=>{

})

const activateAvatarMenu = () => {
  isAvatarMenuActive.value = !isAvatarMenuActive.value;
}

const handleSubmit = (msg) => {
  isLogin.value = msg;
}

const handleLogout = () => {
  window.sessionStorage.removeItem("user_id");
  isLogin.value = false;
  isAvatarMenuActive.value = false;
  router.replace('/');
}

const props = defineProps(["isFixed"]);

//params and callbacks of login module
let showLoginBox = ref(false);
const emit = defineEmits(["click", "logout"]);

const handleOpenLoginBox = () => {
  showLoginBox.value = !showLoginBox.value
};

const handleRouteToProfile = () => {
  router.push({ name: "profile", params: { userId: window.sessionStorage.getItem("user_id") } })
}

</script>

<style scoped>
  .loginbox-enter-from, .loginbox-leave-to{
    opacity: 0;
    transform: scale(0.1);
  }
  .loginbox-enter-active, .loginbox-leave-active{
    transition: all 1s ease;
  }

  .menu-enter-from{
    opacity: 0;
    transform: scale(0.95);
  }

  .menu-enter-active{
    transition: all 0.1s ease-in;
  }

  .menu-enter-to{
    opacity: 1;
    transform: scale(1);
  }

  .menu-leave-from{
    opacity: 1;
    transform: scale(1);
  }

  .menu-leave-active{
    transition: all 0.1s ease-out;
  }

  .menu-leave-to{
    opacity: 0;
    transform: scale(0.95);
  }
</style>
