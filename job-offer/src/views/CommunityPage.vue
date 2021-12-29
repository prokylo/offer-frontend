<template>
  <HeaderNavComp :isFixed="false"/>
  <div class="container mx-auto">
    <input type="radio" name="tab" id="top-list" class="hidden" checked/>
    <input type="radio" name="tab" id="collection-posts" class="hidden"/>
    <input type="radio" name="tab" id="recent-posts" class="hidden"/>
    <div class="nav-bar rounded-lg shadow py-4 px-8 mb-4 flex items-center">
      <label for="top-list">
        <span class="py-2 px-5 rounded-full inline-block text-2xl">热门</span>
      </label>
      <label for="collection-posts">
        <span class="py-2 px-5 rounded-full inline-block text-2xl">最近</span>
      </label>
      <label for="recent-posts">
        <span class="py-2 px-5 rounded-full inline-block text-2xl">收藏</span>
      </label>
      <button class="ml-auto bg-indigo-600 text-white py-3 px-4 rounded-lg shadow-lg flex items-center" @click="addNewBlog">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span>写博客</span>
      </button>
    </div>
    <div class="rounded-lg shadow-lg mx-auto top-list mb-4">
      <div v-for="blog in blogs" :key="blog.id" class="p-8 cursor-pointer hover:bg-gray-50">
        <BlogItem v-bind="blog"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import avatar from '../assets/avatar.jpg'
import DividerHorizontal from "../components/DividerHorizontal.vue";
import HeaderNavComp from "../components/HeaderNavComp.vue";
import BlogItem from "../components/BlogItem.vue";

const router = useRouter();

onMounted(()=>{
  getPostList();
})

const addNewBlog = () => {
  router.push('/editor/drafts');
}

const getUsernameByAuthorID = async (id) => {
  const res = await fetch(`/api/user/get_user_info?id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8;'
    }
  });
  const userinfo = await res.json();
  // console.log(userinfo)
  return userinfo.data.user_info.name;
}

const constructABlog = async(item) => {
  console.log(item);
  const username = await getUsernameByAuthorID(item.UserID);
  return {
    id: item.ID,
    blogId: item.BlogID,
    time: getRelativeTimeDesc(item.UpdatedAt),
    user: username,
    user_id: item.UserID,
    title: item.Title,
    avatar: avatar,
    content: item.Content,
    likes: item.Likes,
    collections: item.Likes
  };
}

const getPostList = async () => {
  const res = await fetch("/api/blog/show_blog_list", {
    method: "GET"
  })
  const blogList = await res.json();
  for (const item of blogList.data.blogs) {
    blogs.value.push(await constructABlog(item));
  }
}

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
