<template>
  <div class="p-6 m-1.5 border rounded shadow-lg sm:w-12/25 sm:border-r md:w-7/30 info-card break-words">
    <h2 class="text-xl font-bold mb-2"> {{ jobName }}</h2>
    <p class="text-gray-500"> {{ place }} <DividerInlineVertical /> {{ year }} <DividerInlineVertical /> {{ education }}</p>
    <h2 class="text-xl font-bold mb-2 text-indigo-600 my-2">{{ salary }}</h2>
    <DividerHorizontal />
    <div class="bg-gray-100 p-2 text-center w-2/3 my-2 rounded-md text-sm">{{ company }}</div>
  </div>
</template>

<script setup>
import DividerHorizontal from '../components/DividerHorizontal.vue'
import DividerInlineVertical from '../components/DividerInlineVertical.vue'

const props = defineProps(["jobName", "place", "year", "education", "salary", "company", "jobId"])

</script>

<style scoped>

</style>
