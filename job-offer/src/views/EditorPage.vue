<template>
  <div class="flex justify-around bg-gray-50 min-h-screen p-8">
    <textarea class="bg-blue-50 p-2 w-5/12 rounded-lg" v-model="markdown"></textarea>
    <div class="border-r border-gray-500"></div>
    <Markdown class="prose w-5/12 bg-white p-4 rounded-lg shadow-lg" :source="markdown"/>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Markdown from 'vue3-markdown-it';
// import 'highlight.js/lib/common.js'

const markdown = ref('');
const code = ref('haha')
</script>

<style scoped>

</style>
