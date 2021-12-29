<template>
  <HeaderNavComp :isFixed="true"/>
  <div class="bg-gray-50 min-h-screen flex justify-center mb-16">
    <div class="bg-white w-2/3 mr-2 rounded shadow-lg mt-28">
      <h2 class="px-8 pt-8 font-bold text-3xl">{{ title }}</h2>
      <div class="author-bar flex p-8 items-center">
        <img :src="avatar" class="w-12 h-12 mr-4 rounded-full" alt="">
        <div class="author-info-box flex-col">
          <h5 class="text-lg font-semibold">{{ name }}</h5>
          <h6 class="text-gray-500">{{ time }} · 喜欢{{ like }}</h6>
        </div>
        <button class="ml-auto border-2 border-indigo-400 bg-indigo-200 rounded-md px-4 w-30 text-indigo-500 h-12">
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
      <CommentsApp class="mt-4 mb-auto" />
    </div>
    <div class="w-1/4 mt-28 mb-auto bg-white rounded shadow-lg">
      <h2 class="font-bold p-4 text-xl">其他帖子</h2>
      <DividerHorizontal style="width: 90%; margin-left: auto; margin-right: auto;" />
      <RelatedBlogItem v-for="blog in blogs" :key="blog.ID" v-bind="blog" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import { useRouter } from 'vue-router';
import Markdown from 'vue3-markdown-it';

import avatar from '../assets/avatar.jpg'
import DividerHorizontal from "../components/DividerHorizontal.vue";
import HeaderNavComp from "../components/HeaderNavComp.vue";
import RelatedBlogItem from "../components/RelatedBlogItem.vue";
import CommentsApp from "../CommentsApp.vue";

const router = useRouter();

const name = ref("");
const time = ref("");
const title = ref("");
const content = ref("");
const like = ref(0);
const blogs = ref([]);

onMounted(()=>{
  const blogId = router.currentRoute.value.params.blogId;
  getBlogContent(blogId);
  getBlogList();
})

onUpdated(()=>{
  const blogId = router.currentRoute.value.params.blogId;
  getBlogContent(blogId);
  // getBlogList();
})

const getBlogContent = async (id) => {
  const res = await fetch(`/api/blog/show_blog?blog_id=${id}`,{
    method: 'GET'
  })

  const result = await res.json();
  name.value = result.data.blog.AuthorID;
  content.value = result.data.blog.Content;
  time.value = result.data.blog.UpdatedAt;
  title.value = result.data.blog.Title;
  like.value = result.data.blog.Likes;
}

const constructARelatedBlog = (item) => {
  return {
    id: item.ID,
    title: item.Title,
    likes: item.Likes,
    blogId: item.BlogID
  }
}

const getBlogList = async () => {
  const res = await fetch("/api/blog/show_blog_list", {
    method: "GET"
  })
  const blogList = await res.json();
  blogList.data.blogs.forEach((item)=>{
    blogs.value.push(constructARelatedBlog(item));
  })
}


</script>

<style scoped>

</style>
