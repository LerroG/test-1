<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { dataService } from './services/getData';
import MainChart from './components/MainChart.vue';
import MainTable from './components/MainTable.vue';
import { BranchInfo, IGivenTicketsByBranchGraphItem } from './types/data.interface';

const chartData = ref<IGivenTicketsByBranchGraphItem[]>([])
const tableData = ref<BranchInfo[]>([])
const loading = ref(false)
const errorMessage = ref('')
const timer = ref(10)
let intervalId: any = null
let nextRequestTimeout = 10000

const fetchData = async () => {
  loading.value = true
  try {
    const result = await dataService.getData()
    if (result.code < 0) {
      errorMessage.value = result.msg
    } else {
      chartData.value = result.givenTicketsByBranchGraph.items
      tableData.value = result.branchInfos
    }
  } catch (error) {
    console.error('Ошибка при запросе:', error)
  } finally {
    loading.value = false
    resetTimer()
  }
}

const resetTimer = () => {
  timer.value = nextRequestTimeout / 1000
}

const startTimer = () => {
  const interval = setInterval(() => {
    timer.value--;

    if (timer.value < 0) {
      resetTimer()
      clearInterval(interval);
    }
  }, 1000);

  return interval
}

onMounted(async () => {
  await fetchData();
  startTimer()
  // intervalId = setInterval(() => {
  //   if (!loading.value) {
  //     fetchData().then(() => startTimer())

  //   }
  // }, nextRequestTimeout);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <div class="wrapper">
    <h1>Автоматические запросы</h1>
    <div>
      <p>Таймер: {{ timer }} сек.</p>
      <p v-if="loading">Запрос отправляется...</p>
      <!-- <MainChart v-else :chart-data="chartData" /> -->
      <MainTable v-else :tableData="tableData" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply max-w-screen-xl mx-auto mt-16 border p-6 rounded-lg shadow-sm;
}
</style>
