<template>
  <HeaderNavComp :isFixed="false"/>
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
    <div class="rounded-lg shadow-lg mx-auto top-list">
      <div v-for="blog in blogs" :key="blog.id" class="p-8 cursor-pointer hover:bg-gray-50">
        <BlogItem v-bind="blog"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import avatar from '../assets/avatar.jpg'
import DividerHorizontal from "../components/DividerHorizontal.vue";
import HeaderNavComp from "../components/HeaderNavComp.vue";
import BlogItem from "../components/BlogItem.vue";

onMounted(()=>{
  getPostList();
})

const constructABlog = (item) => {
  return {
    id: item.BlogID,
    blogId: item.BlogID,
    user: item.AuthorID,
    time: '1小时前',
    title: item.Title,
    avatar: avatar,
    content: item.Content,
    likes: item.Likes,
    collections: item.Likes
  }
}

const getPostList = async () => {
  const res = await fetch("/api/blog/show_blog_list", {
    method: "GET"
  })
  const blogList = await res.json();
  blogList.data.blogs.forEach((item)=>{
    blogs.value.push(constructABlog(item));
  })
}

const blogs = ref([]);

</script>

<style scoped>
#top-list:checked ~ .nav-bar label[for="top-list"] span{
  @apply text-indigo-600;
  @apply font-bold;
}

#collection-posts:checked ~ .nav-bar label[for="collection-posts"] span{
  @apply text-indigo-600;
  @apply font-bold;
}

#recent-posts:checked ~ .nav-bar label[for="recent-posts"] span{
  @apply text-indigo-600;
  @apply font-bold;
}
</style>
