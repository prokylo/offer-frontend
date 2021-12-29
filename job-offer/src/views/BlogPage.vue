<template>
  <HeaderNavComp :isFixed="true"/>
  <div class="bg-gray-50 flex justify-center pb-2 sm:pb-16">
    <div class="bg-white w-full sm:w-2/3 sm:mr-2 rounded-lg shadow-lg mt-28">
      <h2 class="px-8 pt-8 font-bold text-3xl">{{ title }}</h2>
      <div class="author-bar flex p-8 items-center">
        <img :src="avatar" class="w-12 h-12 mr-4 rounded-full" alt="">
        <div class="author-info-box flex-col">
          <h5 class="text-lg font-semibold">{{ name }}</h5>
          <h6 class="text-gray-500">{{ getRelativeTimeDesc(time) }} · 喜欢{{ like }}</h6>
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
        <Markdown class="prose bg-white p-8" :source="content"/>
      </div>
      <CommentsApp class="mt-4 sm:mb-auto" />
    </div>
    <div class="w-1/4 mt-28 mb-auto bg-white rounded-lg shadow-lg hidden xl:block">
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

function getRelativeTimeDesc(time) {
  const currentInMs = new Date().getTime();
  const timeInMs = new Date(time).getTime();

  const minuteInMs = 60 * 1000;
  const hourInMs = 60 * minuteInMs;
  const dayInMs = 24 * hourInMs;
  const monthInMs = 30 * dayInMs;
  const yearInMs = 365 * monthInMs;

  const relativeTime = currentInMs - timeInMs;
  if (relativeTime < minuteInMs) {
    return `${Math.ceil(relativeTime / 1000)} 秒前`;
  } else if (relativeTime < hourInMs) {
    return `${Math.ceil(relativeTime / minuteInMs)} 分钟前`;
  } else if (relativeTime < dayInMs) {
    return `${Math.ceil(relativeTime / hourInMs)} 小时前`;
  } else if (relativeTime < monthInMs) {
    return `${Math.ceil(relativeTime / dayInMs)} 天前`;
  } else if (relativeTime < yearInMs) {
    return `${Math.ceil(relativeTime / monthInMs )} 月前`;
  } else {
    return `${Math.ceil(relativeTime / yearInMs)} 年前`;
  }
}

const getBlogContent = async (id) => {
  const res = await fetch(`/api/blog/show_blog?blog_id=${id}`,{
    method: 'GET'
  })
  const result = await res.json();

  const userinfo = await fetch(`/api/user/get_user_info?id=${result.data.blog.UserID}`, {
    method: 'GET'
  });

  const userjson = await userinfo.json();

  name.value = userjson.data.user_info.name;
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
