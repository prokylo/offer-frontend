<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <div class="container max-w-screen-xl p-8 mx-auto rounded-lg shadow-lg bg-white">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">【22秋招】C++开发工程师</h2>
        <button class="rounded-full border-2 border-green-600 py-2 px-4 cursor-pointer" @click="backToHome">返回职位列表</button>
      </div>
      <DividerHorizontal />

      <div class="flex bg-gray-50 p-6 font-semibold">
        <div class="w-1/3 ">公司名称：腾讯</div>
        <div class="w-1/3 ">工作地点：上海市</div>
      </div>
      <div class="px-6">
        <h2 class="text-xl font-semibold border-r-4 border-green-600 my-8">职位描述</h2>
        <ul>
          <li v-for="jd in jobDescription" :key="jd.index" class="my-2">
            {{ jd }}
          </li>
        </ul>
        <h2 class="text-xl font-semibold border-r-4 border-green-600 my-8">任职资格</h2>
        <ul>
          <li v-for="jd in jobTech" :key="jd.index" class="my-2">
            {{ jd }}
          </li>
        </ul>
        <div class="mt-8 mb-4">
          <label for="resume-upload" class="bg-green-500 text-white rounded-full px-4 py-2">
            <span>上传简历</span>
          </label>
          <input class="hidden" id="resume-upload" type="file"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DividerHorizontal from "../components/DividerHorizontal.vue";
import DividerInlineVertical from "../components/DividerInlineVertical.vue";
import { ref } from 'vue';
import {useRouter} from "vue-router";

const jobDescription = ref([
  '1、参与前端的开发工作，将创意变成现实，并确保顺畅的用户体验；',
  '2、对产品负责，以技术的视角思考产品价值，透过技术打磨出更好的产品；',
  '3、参与团队的技术沉淀，与团队一并成长。'
])

const jobTech = ref([
    '1、熟悉 JavaScript，CSS 等前端技术，熟悉 W3C 标准、HTTP 协议；',
    '2、参与开发过较为复杂的 web 应用，对于 web 开发常见的安全/性能/模块化等问题有一定认识；',
    '3、了解并使用过 Vue/React 等前端框架及其生态，并对其实现有一定认识；',
    '4、好奇心，积极主动，强烈的责任心，良好的沟通协调能力，和解决问题的能力。'
])

const router = useRouter();

const backToHome = () => {
  router.push({ path: '/jobs'})
}

</script>

<style scoped>

</style>
