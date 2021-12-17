<template>
  <div class="container mx-auto">
    <input type="radio" name="tab" id="top-list" class="hidden" checked/>
    <input type="radio" name="tab" id="collection-posts" class="hidden"/>
    <input type="radio" name="tab" id="recent-posts" class="hidden"/>
    <div class="nav-bar rounded-lg shadow py-4 px-8 mb-4">
      <label for="top-list">
        <span class="py-2 px-5 rounded-full inline-block text-2xl">热门</span>
      </label>
      <label for="collection-posts">
        <span class="py-2 px-5 rounded-full inline-block text-2xl">最近</span>
      </label>
      <label for="recent-posts">
        <span class="py-2 px-5 rounded-full inline-block text-2xl">收藏</span>
      </label>
    </div>
    <div class="rounded-lg shadow-lg mx-auto p-8 top-list">
      <PostItem v-for="post in posts" :key="post.id" v-bind="post" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import avatar from '../assets/avatar.jpg'
import PostItem from "../components/PostItem.vue";
import DividerHorizontal from "../components/DividerHorizontal.vue";
const posts = ref([
  {
    id: 1,
    postId: '0001',
    user: '徐摆渡',
    intro: '资深开发工程师',
    time: '1小时前',
    title: '如何如何如何如何',
    avatar: avatar,
    content: '这般这般这般',
    subscribes: 1,
    collections: 2
  },
  {
    id: 2,
    postId: '0002',
    user: '徐摆渡',
    intro: '资深开发工程师',
    time: '1小时前',
    title: '如何如何如何如何',
    avatar: avatar,
    content: '这般这般这般',
    subscribes: 1,
    collections: 2
  }
]);


</script>

<style scoped>
#top-list:checked ~ .nav-bar label[for="top-list"] span{
  @apply text-yellow-600;
  @apply underline;
}

#collection-posts:checked ~ .nav-bar label[for="collection-posts"] span{
  @apply text-yellow-600;
}

#recent-posts:checked ~ .nav-bar label[for="recent-posts"] span{
  @apply text-yellow-600;
}
</style>
