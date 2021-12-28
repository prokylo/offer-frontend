<template>
  <div class="dark-bg-box bg-black bg-opacity-30 w-full h-full absolute top-0 z-20">
    <div class="flex justify-center items-center w-full h-full z-30">
      <div class="w-96 h-96 bg-yellow-400 rounded-lg shadow-lg relative z-40">
        <form action="" class="w-full h-full flex flex-col justify-around items-center" @submit="handleLoginRequest">
          <div class="flex flex-row items-center bg-white h-10 rounded-lg border-2 border-transparent focus-within:border-indigo-500">
            <input v-model="email" required type="email" autocomplete="email" class="border-b border-transparent rounded px-4 focus-within:outline-none group" />
            <span class="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
          </div>
          <div class="flex flex-row bg-white h-10 items-center rounded-lg border-2 border-transparent focus-within:border-indigo-500">
            <input v-model="password" type="password" class="border-b border-transparent rounded px-4 focus-within:outline-none group" />
            <span class="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          </div>
          <fieldset class="py-4">
            <input
                type="submit"
                value="登录"
                class="px-4 py-1.5 bg-indigo-600 rounded text-white"
            />
            <input
                type="button"
                value="注册"
                class="px-4 py-1.5 bg-white rounded border ml-3"
            />
          </fieldset>
          <button @click="handleCloseLoginBox" class="absolute -right-6 -top-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref("");
const password = ref("");

const emit = defineEmits(["submit", "click"]);

const handleLoginRequest = async (e) => {
  e.preventDefault();

  console.log(JSON.stringify({
    email: email.value,
    password: password.value
  }))
  const res = await fetch("api/index/login",{
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8;'
    },
    body:JSON.stringify({
      email: email.value,
      password: password.value
    })
  });
  const comments = await res.json();
  console.log(comments);
}

const handleCloseLoginBox = (e) => {
  e.preventDefault();
  emit("click", false);
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
