<template>
  <div class="mx-auto p-4 flex">
    <div class="mx-auto p-8 w-1/2 grid">
      <textarea v-model="content"
                class="p-2 bg-blue-50 rounded-lg focus-within:outline-white"
      ></textarea>
    </div>
    <div class="h-screen border-r border-blue-400">
    </div>
    <div class="mx-auto p-8 w-1/2 grid">
      <Markdown :source="content" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const content = ref("");

import { watch } from 'vue';

import Markdown from 'vue3-markdown-it'; //markdown
import 'highlight.js/styles/monokai.css'; //markdown

watch(content, (newVal, oldVal)=>{

  document.body.getElementsByTagName('h1').forEach((item, index)=>{
    console.log(item);
    item.style.cssText += 'font-size: 28px;';
    console.log(item);
  })
  // console.log({ newVal, oldVal})
})


</script>

<style scoped>
</style>
