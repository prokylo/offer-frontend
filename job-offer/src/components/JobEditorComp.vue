<template>
  <div class="dark-bg-box bg-black bg-opacity-10 w-full h-full absolute top-0 z-20">
    <div class="flex justify-center items-center w-full h-full z-30">
      <div class="w-1/3 h-3/4 bg-yellow-400 rounded-lg shadow-lg relative z-40">
        <form action="" class="w-full h-full flex flex-col justify-around">
          <div class="mx-auto">
            <span class="mr-4 font-bold">职位名称:</span>
            <input v-model="title" required autocomplete="" class="outline-indigo-500 rounded-lg px-4 py-2 group" />
          </div>
          <div class="mx-auto">
            <span class="mr-4 font-bold">公司名称:</span>
            <input v-model="company" required autocomplete="" class="outline-indigo-500 rounded-lg px-4 py-2 group" />
          </div>
          <div class="mx-auto">
            <span class="mr-4 font-bold">工作地点:</span>
            <input v-model="base" required autocomplete="" class="outline-indigo-500 rounded-lg px-4 py-2 group" />
          </div>
          <div class="mx-auto">
            <span class="mr-4 font-bold">任职要求:</span>
            <input v-model="content" required autocomplete="" class="outline-indigo-500 rounded-lg px-4 py-2 group" />
          </div>
          <fieldset class="flex mx-auto">
            <input
                type="button"
                value="提交"
                class="px-4 py-1.5 bg-indigo-600 mr-4 rounded text-white"
                @click="handleCreateBlog"
            />
            <input
                type="button"
                value="取消"
                class="px-4 py-1.5 bg-white rounded border" @click=""
            />
          </fieldset>
          <button @click="" class="absolute -right-6 -top-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const title = ref('');
const company = ref('');
const base = ref('');
const content = ref('');

const handleCreateBlog = async ()=>{
  const http = await fetch('/api/job/campaign_job', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8;'
    },
    body:JSON.stringify({
      user_id: parseInt(window.sessionStorage.getItem('user_id')),
      title : title.value,
      company : company.value,
      base : base.value,
      content : content.value
    })
  })

  const resp = await http.json();
  if(resp.code === 0){
    alert('发布成功！');
    router.go(-1);
  }
}

</script>

<style scoped>

</style>
