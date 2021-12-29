<template>
  <HeaderNavComp />
  <div class="container mx-auto my-4">
    <div class="wrapper-search-bar my-4 mx-6 sm:mx-0">
      <div class="border-2 border-gray-200 inline-block flex
        sm:w-2/3 rounded-full z-10 bg-white
        focus-within:border-indigo-500"
      >
        <input
            type="text"
            class="border-none px-4 py-3 w-full rounded-full focus-within:outline-none"
            placeholder="请输入想要查找的职位/公司" />
        <button class="border bg-indigo-600 rounded-full py-3 w-28 text-white">搜索</button>
      </div>
    </div>
    <img src="https://www.apple.com/v/mac/home/bj/images/overview/hero/hero_macbook_pro_14_16__0y2t2v3g4hu2_large_2x.jpg"
         class="mx-auto rounded shadow-lg">

    <div class="my-8 sm:flex sm:flex-wrap sm:justify-between">
      <JobCardBox v-for="job in jobs"
                  :key="job.id"
                  @click="routeToDetailPage"
                  class="cursor-pointer"
                  v-bind="job"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import JobCardBox from '../components/JobCardBox.vue'
import Global from "../Global.vue";
import {useRouter} from "vue-router";
import HeaderNavComp from "../components/HeaderNavComp.vue";

// const token = Global.token;
// console.log(token);

const router = useRouter();
const routeToDetailPage = ()=>{
  router.push({ name: 'detail', params:{ jobId: 2}})
}

onMounted(()=>{
  getJobList();
})

const getJobList = async () => {
  const res = await fetch('/api/job/show_job_list',{
    method: 'GET'
  })

  const jobList = await res.json();
  jobList.data.jobs.forEach((item)=>{
    // console.log(item);
    jobs.value.push(constructAJobDescription(item));
  })
}

const constructAJobDescription = (item) => {
  return {
    id: item.ID,
    jobName: item.title,
    place: item.base,
    education: '本科',
    year: '3-5年',
    company: item.company,
    salary: '25K-30K'
  }
}

// {
//   id: 1,
//       jobName: 'C++开发工程师',
//     place: '上海',
//     year: '3-5年',
//     education: '本科',
//     salary: '25-30K',
//     company: 'Apple'
// },
// {
//   id: 2,
//       jobName: 'C++开发工程师',
//     place: '上海',
//     year: '3-5年',
//     education: '本科',
//     salary: '25-30K',
//     company: 'Apple'
// },
// {
//   id: 3,
//       jobName: 'C++开发工程师',
//     place: '上海',
//     year: '3-5年',
//     education: '本科',
//     salary: '25-30K',
//     company: 'Apple'
// },
// {
//   id: 4,
//       jobName: 'C++开发工程师',
//     place: '上海',
//     year: '3-5年',
//     education: '本科',
//     salary: '25-30K',
//     company: 'Apple'
// }

const jobs = ref([]);
</script>

<style scoped lang="less">
 .info-card:hover {
   //animation: info-card-pump-up 1s ease-in-out ;
   transform: translateY(-5px);
   transition: all .3s;
 }

</style>
