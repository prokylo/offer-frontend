<template>
  <div class="p-4 flex border-b border-gray-300">
    <button class="ml-auto mr-4 bg-indigo-500 text-white py-3 px-6 rounded-lg shadow"
      @click="handleCreateBlog"
    >提交</button>
  </div>
  <div class="flex justify-around bg-gray-50 min-h-screen p-8">
    <div class="w-5/12">
      <input type="text" class="w-full p-4 bg-gray-50 border-b-2 rounded-lg focus-within:outline-none text-3xl text-black font-bold"
             v-model="title" placeholder="请输入标题......"/>
      <textarea class="mt-8 bg-blue-50 p-2 w-full h-6/7 rounded-lg" v-model="content"></textarea>
    </div>
    <div class="border-r border-gray-500"></div>
    <Markdown class="prose w-5/12 bg-white p-4 rounded-lg shadow-lg" :source="content"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Markdown from 'vue3-markdown-it';
import { useRouter } from 'vue-router';

// import 'highlight.js/lib/common.js'
const router = useRouter();
const content = ref('');
const title = ref('');

const handleCreateBlog = async () => {
  const res = await fetch('/api/blog/create_blog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8;'
    },
    body: JSON.stringify({
      user_id: parseInt(window.sessionStorage.getItem('user_id')),
      content: content.value,
      title: title.value
    })
  })

  const blogRes = await res.json();
  if(blogRes.code === 0){
    await router.push('/community')
  }
}

</script>

<style scoped>

</style>
