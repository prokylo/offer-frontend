<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="bg-white max-w-screen-xl mx-auto rounded shadow-lg">
      <h2 class="px-8 pt-8 font-bold text-3xl">如何如何如何{{ $route.params.blogId }}</h2>
      <div class="author-bar flex p-8 items-center">
        <img :src="avatar" class="w-12 h-12 mr-4 rounded-full" alt="">
        <div class="author-info-box flex-col">
          <h5 class="text-lg font-semibold">宜兴小火龙</h5>
          <h6 class="text-gray-500">一个月前 · 阅读534</h6>
        </div>
        <button class="ml-auto border-2 border-green-400 bg-green-200 rounded-md px-4 w-30 text-green-500 h-12">
          <span class="items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            关注
          </span>
        </button>
      </div>
      <DividerHorizontal class="w-11/12 mx-auto"/>
      <div class="blog-content">
        <Markdown class="prose bg-white p-8 " :source="content"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Markdown from 'vue3-markdown-it';

import avatar from '../assets/avatar.jpg'
import DividerHorizontal from "../components/DividerHorizontal.vue";

const router = useRouter();

const content = ref("");

onMounted(()=>{

  const blogId = router.currentRoute.value.params.blogId;
  getBlogContent(blogId);

})

const getBlogContent = async (id) => {
  const res = await fetch(`/api/blog/show_blog?blog_id=${id}`,{
    method: 'GET'
  })

  const result = await res.json();
  content.value = result.data.blog.Content;
}

</script>

<style scoped>

</style>
