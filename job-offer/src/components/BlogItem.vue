<template>
  <div class="flex">
    <img
        :src="avatar"
        alt=""
        class="w-16 h-16 mr-4 rounded-full"
    />
    <div class="self-center">
      <p>{{ user }}</p>
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
    <Markdown class="text-gray-600 overflow-ellipsis overflow-content no-prose" :source="content" />
  </div>
  <div class="my-2 flex items-center">
    <button class="flex flex-row">
      <span class="mr-2">{{ likes }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
    <div class="w-6"></div>

    <button class="flex flex-row">
      <span class="mr-2">{{ collections }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    </button>
  </div>
  <DividerHorizontal />
</template>

<script setup>
import DividerHorizontal from './DividerHorizontal.vue'
import Markdown from 'vue3-markdown-it'
import { useRouter } from 'vue-router'
const props = defineProps(["id", "blogId", "user", "time", "title", "avatar", "content", "likes", "collections"]);
const router = useRouter();

const handleTurnToPostContent = () =>{
  router.push({ name: 'blog', params: { blogId: props.blogId } });
}

</script>

<style scoped>
  .overflow-content{
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
</style>
