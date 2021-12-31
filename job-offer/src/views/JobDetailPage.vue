<template>
  <div class="p-0 sm:p-4 bg-gray-100 min-h-screen">
    <div class="container max-w-screen-xl p-8 mx-auto rounded-lg shadow-lg bg-white">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">【2022秋招】{{ title }}</h2>
        <button class="rounded-full border-2 border-indigo-600 py-2 px-4 cursor-pointer" @click="backToHome">返回职位列表</button>
      </div>
      <DividerHorizontal />

      <div class="flex bg-gray-50 p-6 font-semibold">
        <div class="w-1/2 sm:w-1/3">公司名称：{{ company }}</div>
        <div class="w-1/2 sm:w-1/3">工作地点：{{ base }}</div>
      </div>
      <div class="px-6">
        <h2 class="text-xl font-semibold border-r-4 border-indigo-600 my-8">职位描述</h2>
        <ul>
          <li class="my-2">
            {{ content }}
          </li>
<!--          <li v-for="jd in jobDescription" :key="jd.index" class="my-2">-->
<!--            1、{{ content }}-->
<!--          </li>-->
        </ul>
        <h2 class="text-xl font-semibold border-r-4 border-indigo-600 my-8">任职资格</h2>
        <ul>
          <li class="my-2">
            {{ content }}
          </li>
        </ul>
        <span class="text-indigo-600 inline-block my-8 text-xl font-bold border-b-2 border-b-indigo-600">
          上传简历
        </span>
        <embed :src="mfile">
        <h2 class="text-sm mb-4">从本地上传</h2>
        <form method="post" enctype="multipart/form-data">
          <div class="flex items-center space-x-6">
            <label class="block">
              <input id="resume" name="resume" type="file" class="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100" @change="handleFileOverview"
              />
            </label>
            <button type="button" class="px-4 py-2 text-white text-sm bg-indigo-500 rounded-full ml-auto" @click="handleFileUpload">确认提交</button>
          </div>
        </form>
        <DividerHorizontal class="my-8"/>
        <div>
          <h2 class="text-sm my-4">从profile上传</h2>
          <button type="button" class="px-4 py-2 text-white text-sm bg-indigo-500 rounded-full ml-auto" @click="">确认提交</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import DividerHorizontal from "../components/DividerHorizontal.vue";
import DividerInlineVertical from "../components/DividerInlineVertical.vue";
import { ref, onMounted, onUpdated } from 'vue';
import { useRouter } from "vue-router";

const mfile = ref();

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

const content = ref('');
const title = ref('');
const company = ref('');
const base = ref('');
const fileList = ref();

const router = useRouter();

const backToHome = () => {
  router.push({ path: '/jobs'})
}

const getJobDetailDescription = async (id) => {
  const res = await fetch(`/api/job/show_job?job_id=${id}`, {
    method: 'GET'
  })

  const jobobj = await res.json();
  title.value = jobobj.data.job.title;
  company.value = jobobj.data.job.company;
  base.value = jobobj.data.job.base;
  content.value = jobobj.data.job.content;

  console.log(jobobj)
}

onMounted(()=>{
  const jobID = router.currentRoute.value.params.jobId;
  // console.log(jobID);
  getJobDetailDescription(jobID);
})


async function handleFileOverview() {
  let file = document.getElementById('resume').files;
  // mfile.value = file[0];

  // let reader = new FileReader();
  // if(file && file[0]){
  //   reader.onload = function (ev) {
  //     mfile.value = ev.target.result;
  //   }
    // reader.readAsDataURL(file[0]);
  // }

  // console.log(file);
  // console.log(file[0].name);
}

const handleFileUpload = async () => {
  let file = document.getElementById('resume').files[0];
  console.log(file);
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('user_id', window.sessionStorage.getItem('user_id'));
  formData.append('Filename', file.name);
  // console.log(formData.);
  const http = await fetch('/api/user/upload_resume', {
    method: 'POST',
    body: formData
  }).catch(e =>{
    console.log(e);
  })

  const resp = await http.json();
  console.log(resp);
}

//
// onUpdated(()=>{
//   handleFileOverview();
// })

</script>

<style scoped>

</style>
