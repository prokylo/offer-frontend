<template>
  <div class="bg-gray-50 min-h-screen">
    <HeaderNavComp />
<!--    <a class="hidden" id="file-download"></a>-->
    <div class="grid gap-4 grid-cols-6 mt-8">
      <div class="mt-2 col-span-6 md:col-span-4 md:col-start-2">
        <form>
          <div class="shadow sm:rounded-md sm:overflow-hidden">
            <div class="px-4 py-5 bg-white space-y-6 sm:p-12">
              <div>
                <label class="text-2xl font-semibold text-gray-700">我的简历</label>
                <span class="ml-4 text-gray-700">{{ username }}</span>
                <div class="mt-4 flex items-center">
                  <img class="w-16 h-16 rounded-full" :src="avatar"/>
                </div>
              </div>
              <div class="flex justify-center">
<!--                <iframe style="width: 100%;" class="h-screen" :src="resumeURL"></iframe>-->
<!--                <embed :src="resumeURL" class="w-6/7 h-screen hidden" />-->
              </div>

              <div v-if="hasResume">
                <h2 class="text-xl text-gray-500 col-span-4 border-r-4 border-indigo-600">简历附件</h2>
                <div class="grid grid-cols-8">
                  <div class="col-span-4 sm:col-span-3 md:col-span-2 bg-indigo-50 mt-6 px-6 py-4 rounded-lg flex">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <a class="text-blue-500 ml-auto hover:cursor-pointer" :href="aresumeURL" target="_blank">下载</a>
                  </div>
                </div>
              </div>
              <div v-else>
                <h2 class="bg-indigo-50 p-4 rounded-lg shadow text-lg">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </span>
                  Hi，还没有上传简历哦，赶紧上传一份吧！
                </h2>
                <label class="block text-lg font-semibold text-gray-700 my-2">
                  Upload resume
                </label>
                <div class="mt-4 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div class="space-y-1 text-center">
                    <svg class="mx-auto h-16 w-16 flex items-center justify-center text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div class="flex text-sm text-gray-600 justify-center">
                      <label for="resume-input" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span>Upload a file</span>
                        <input id="resume-input" name="resume-input" type="file" class="sr-only" @change="handleFileUpdated"/>
                      </label>
<!--                      <p class="pl-1">or drag and drop</p>-->
                    </div>
                    <p class="text-xs text-gray-500">
                      PDF, DOC, DOCS up to 10MB
                    </p>
                  </div>
                </div>
              </div>
              <div class="applied-jobs">
                <h2 class="mt-20 mb-4 text-xl text-gray-500 col-span-4 border-r-4 border-indigo-600">已申请的职位列表</h2>
                <table class="w-full mt-2 p-8" v-if="hasApplication">
                  <tr class="bg-gray-50">
                    <th class="font-medium p-6">岗位名称</th>
                    <th class="font-medium p-6">公司</th>
                    <th class="font-medium p-6">工作地点</th>
                    <th class="font-medium p-6">投递时间</th>
                  </tr>
                  <tr v-for="job in jobList" :key="job.ID">
                    <th class="p-4">{{ job.title }}</th>
                    <th class="p-4">{{ job.company }}</th>
                    <th class="p-4">{{ job.base }}</th>
                    <th class="p-4">{{ job.time }}</th>
                  </tr>
                </table>
                <h2 v-else class="justify-center flex bg-indigo-50 p-4 rounded-lg">您还没有申请任何岗位！</h2>
              </div>
            </div>
            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button type="button" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="handleUploadResume">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderNavComp from "../components/HeaderNavComp.vue";
import avatar from "../assets/avatar.jpg";

import { ref, onBeforeMount } from 'vue';
const hasResume = ref(false);
const hasApplication = ref(false);
const username = ref('');

const userID = ref('');
// const baseFileUrl = "./../../../../../ProgramData (x86)/Go/src/advanced_programming/saved_files/";

const baseFileUrl = "/";

const resumeURL = ref();

const aresumeURL = ref('');

const jobList = ref([]);

const getUserName = async () => {
  const res = await fetch(`/api/user/profile?user_id=${userID.value}`,{
    method: 'GET'
  })
  const userinfo = await res.json();
  username.value = userinfo.data.name;
  if(userinfo.data.resume !== ''){
    hasResume.value = true;
  }
}

const handleDownloadResume = async ()=>{
  const http = await fetch(`/api/user/download_resume?user_id=${userID.value}`,{
    method: 'GET',
  })
  // const res = await http.json();
  // console.log(http);
}

onBeforeMount(()=>{
  userID.value = window.sessionStorage.getItem("user_id");
  aresumeURL.value = 'http://127.0.0.1:8080/user/download_resume?user_id=' + userID.value;
  // console.log(aresumeURL.value);
  getUserName();
  getApplicationList();
})

const handleFileUpdated = async () => {
  // console.log(file);
}

const handleUploadResume = async() => {
  let file = document.getElementById('resume-input').files[0];

  const formData = new FormData();
  formData.append('resume', file);
  formData.append('user_id', window.sessionStorage.getItem('user_id'));
  formData.append('Filename', file.name);
  const http = await fetch('/api/user/upload_resume', {
    method: 'POST',
    body: formData
  })

  const resp = await http.json();
  if(resp.code === 0){
    alert('上传成功!');
  }
}

const constructApplication = (item)=>{
  const time = new Date(item.UpdatedAt);
  const year = time.getFullYear();
  const month = time.getUTCMonth() + 1;
  const day = time.getDate();
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  return {
    id: item.ID,
    company: item.company,
    title: item.title,
    base: item.base,
    time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  }
}

const getApplicationList = async ()=>{
  const id = window.sessionStorage.getItem('user_id');
  const http = await fetch(`/api/user/my_applications?user_id=${id}`, {
    method: 'GET'
  })

  const res = await http.json();
  jobList.value = [];
  res.data.jobs.forEach((item)=>{
    constructApplication(item);
    jobList.value.push(constructApplication(item));
    hasApplication.value = true;
  })
}

</script>

<style scoped>

</style>
