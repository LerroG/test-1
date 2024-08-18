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

defineProps<{ tableData: BranchInfo[] }>()

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
        <TableHead class="text-center">
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
            <TableCell class="w-2/5">
            </TableCell>
            <TableCell class="text-center">{{ item.givenTickets }}
            </TableCell>
            <TableCell class="text-center">{{ item.servedTaskCount }}
            </TableCell>
            <TableCell class="text-center">{{ item.avgWaitTime }}
            </TableCell>
            <TableCell class="text-center">{{ item.avgAdminTime }}
            </TableCell>
            <TableCell class="text-center">{{ item.missingClients }}
            </TableCell>
          </TableRow>
          <CollapsibleContent as-child>
            <TableRow v-for="data in item.serviceData">
              <TableCell>{{ data.branchName }}</TableCell>
              <TableCell>{{ data.serviceName }}</TableCell>
              <TableCell class="text-center">{{ data.givenTickets }}</TableCell>
              <TableCell class="text-center">{{ data.servedTaskCount }}</TableCell>
              <TableCell class="text-center">{{ data.avgWaitTime }}</TableCell>
              <TableCell class="text-center">{{ data.avgAdminTime }}</TableCell>
              <TableCell class="text-center">{{ data.missingClients }}</TableCell>
            </TableRow>
          </CollapsibleContent>
        </CollapsibleTrigger>
      </Collapsible>
    </TableBody>
  </Table>
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