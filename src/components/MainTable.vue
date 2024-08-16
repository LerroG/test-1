<script lang="ts" setup>
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BranchInfo } from '@/types/data.interface';

const props = defineProps<{ tableData: BranchInfo[] }>()

const keys = ['branchName', 'givenTickets', 'servedTaskCount', 'avgWaitTime', 'avgAdminTime', 'missingClients',]
</script>

<template>
  <Accordion type="multiple" class="w-full">
    <AccordionItem v-for="item, idx in tableData" :key="idx" :value="item.branchName">
      <AccordionTrigger>
        <div class="accordion_trigger">
          <div class="accordion_trigger_cell" v-for="key in keys" :key="key">{{ item[key as keyof BranchInfo] }}</div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <!-- {{ item.content }} -->
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

<style scoped>
.accordion_trigger {
  @apply grid grid-flow-col grid-cols-8 w-full;
}

.accordion_trigger>div:first-child {
  @apply col-span-3 flex justify-start;
}

.accordion_trigger>div:not(:first-child) {
  @apply col-span-1 flex justify-center;
}
</style>