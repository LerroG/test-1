<script lang="ts" setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-vue-next'
import { BranchInfo } from '@/types/data.interface';

const props = defineProps<{ tableData: BranchInfo[] }>()

const keys = ['branchName', '', 'givenTickets', 'servedTaskCount', 'avgWaitTime', 'avgAdminTime', 'missingClients']
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="w-1/5">
          Филиал
        </TableHead>
        <TableHead class="text-center">Наз. услуги</TableHead>
        <TableHead class="text-center">Выдано билетов</TableHead>
        <TableHead class="text-center">
          Завершено операций
        </TableHead>
        <TableHead class="text-center">
          Ср. время ожидания
        </TableHead>
        <TableHead class="text-center">
          Ср. время обслуживания
        </TableHead>
        <TableHead>
          Потеряно билетов
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <Collapsible v-for="item, idx in tableData" :key="idx" type="multiple" as-child>
        <CollapsibleTrigger as-child>
          <TableRow class="cursor-pointer [&[aria-expanded=true]>td>div>svg]:rotate-180">
            <TableCell>
              <div class="flex">
                <ChevronDown class="h-4 w-4 mr-2 shrink-0 transition-transform duration-200" />
                {{ item.branchName }}
              </div>
            </TableCell>
            <TableCell>
            </TableCell>
            <TableCell>{{ item.givenTickets }}
            </TableCell>
            <TableCell>{{ item.servedTaskCount }}
            </TableCell>
            <TableCell>{{ item.avgWaitTime }}
            </TableCell>
            <TableCell>{{ item.avgAdminTime }}
            </TableCell>
            <TableCell>{{ item.missingClients }}
            </TableCell>
          </TableRow>
        </CollapsibleTrigger>
        <CollapsibleContent as-child>
          <TableRow v-for="data in item.serviceData">
            <TableCell>{{ data.branchName }}</TableCell>
            <TableCell>{{ data.serviceName }}</TableCell>
            <TableCell>{{ data.givenTickets }}</TableCell>
            <TableCell>{{ data.servedTaskCount }}</TableCell>
            <TableCell>{{ data.avgWaitTime }}</TableCell>
            <TableCell>{{ data.avgAdminTime }}</TableCell>
            <TableCell>{{ data.missingClients }}</TableCell>
          </TableRow>
        </CollapsibleContent>
      </Collapsible>
    </TableBody>
  </Table>

  <!-- <Accordion type="multiple" class="w-full">
    <AccordionItem v-for="item, idx in tableData" :key="idx" :value="item.branchName">
      <AccordionTrigger>
        <div class="accordion_trigger">
          <div class="accordion_trigger_cell" v-for="key in keys" :key="key">{{ item[key as keyof BranchInfo] }}</div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {{ item.content }}
      </AccordionContent>
    </AccordionItem>
  </Accordion> -->
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