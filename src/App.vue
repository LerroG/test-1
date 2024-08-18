<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { dataService } from './services/getData';
import MainChart from './components/MainChart.vue';
import MainTable from './components/MainTable.vue';
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useToast } from '@/components/ui/toast/use-toast'
import { BranchInfo, IGivenTicketsByBranchGraphItem } from './types/data.interface';

const chartData = ref<IGivenTicketsByBranchGraphItem[]>([])
const tableData = ref<BranchInfo[]>([])
const loading = ref(false)
const timer = ref(10)
let intervalId: any = null
let nextRequestTimeout = 10000
const { toast } = useToast()

const fetchData = async () => {
  loading.value = true
  try {
    const result = await dataService.getData()
    if (result.code < 0) {
      toast({
        title: 'Произошла ошибка',
        description: result.msg
      });
    } else {
      chartData.value = result.givenTicketsByBranchGraph.items
      tableData.value = result.branchInfos
    }
  } catch (error) {
    console.error('Ошибка при запросе:', error)
    toast({
      variant: "destructive",
      title: 'Произошла ошибка',
      description: error as string
    });

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
  <Toaster />
  <div class="wrapper">
    <div>
      <p class="mb-4 border-2 rounded-md border-gray-400 w-fit p-2">Следующее обновление данных через: <span
          class="font-bold">{{ timer }}</span>
        сек.</p>
      <p v-if="loading">Запрос отправляется...</p>
      <template v-else>
        <MainChart class="mb-10" :chart-data="chartData" />
        <MainTable :tableData="tableData" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  @apply max-w-screen-xl mx-auto mt-16 border p-6 rounded-lg shadow-sm;
}
</style>
