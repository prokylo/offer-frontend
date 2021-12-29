<template>
  <div class="p-4">
    <h2 class="mb-2 text-lg hover:cursor-pointer hover:text-indigo-500" @click="goToBlogPageByID">{{ title }}</h2>
    <h3 class="text-gray-500">{{ likes }}点赞</h3>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

const props = defineProps(["title", "likes", "blogId"])

const goToBlogPageByID = ()=>{
  router.push({ name: 'blog', params: { blogId: props.blogId } });
};

</script>

<style scoped>

</style>
