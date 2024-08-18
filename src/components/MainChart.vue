<script lang="ts" setup>
import { BarChart } from '@/components/ui/chart-bar'
import CustomChartTooltip from '@/components/CustomTooltip.vue'
import { IGivenTicketsByBranchGraphItem } from '@/types/data.interface';

const props = defineProps<{ chartData: IGivenTicketsByBranchGraphItem[] }>()

const ticketCount = 'Количество билетов'
const ticketCountPercent = 'Количество в % от общего числа'

const dataOutput = props.chartData.map(item => {
  return {
    BranchName: item.BranchName,
    [ticketCount]: item.TicketCount,
    [ticketCountPercent]: Math.round((Number(item.TicketCountPercent.slice(0, -2)) / 100) * item.TicketCount)
  } || []
})
</script>

<template>

  <BarChart :margin="{ top: 15 }" index="BranchName" :num-ticks="dataOutput.length" :data="dataOutput"
    :categories="[ticketCount, ticketCountPercent]" :rounded-corners="4" :custom-tooltip="CustomChartTooltip" />
</template>