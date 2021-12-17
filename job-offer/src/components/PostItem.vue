<template>
  <div class="flex">
    <img
        :src="avatar"
        alt=""
        class="w-16 h-16 mr-4 rounded-full"
    />
    <div>
      <p>{{ user }}</p>
      <p class="text-gray-600 text-sm">{{ intro }}</p>
      <p class="text-gray-600 text-sm">{{ time }}</p>
    </div>
    <button @click="window.open('www.baidu.com', 'blank')" class="ml-auto">
      <span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
          <path
              d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
          />
        </svg>
      </span>
    </button>
  </div>
  <div @click="handleTurnToPostContent">
    <h2 class="text-2xl font-bold text-black my-4">
      {{ title }}
    </h2>
    <p class="text-gray-600">
      {{ content }}
    </p>
  </div>
  <div class="my-2">
    <span>{{ subscribes }} 点赞</span>
    <div class="w-4 inline-block"></div>
    <span>{{ collections }} 收藏</span>
  </div>
  <DividerHorizontal />
</template>

<script setup>
import DividerHorizontal from './DividerHorizontal.vue'
import { useRouter } from 'vue-router'
const props = defineProps(["postId", "user", "intro", "time", "title", "avatar", "content", "subscribes", "collections"]);
const router = useRouter();

const handleTurnToPostContent = () =>{
  router.push({ name: 'post', params: { postId: props.postId } });
}

</script>

<style scoped>

</style>
