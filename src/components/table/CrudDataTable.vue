<script setup lang="ts">
import type { DTable } from './DataTable.spec'
import { ofetch } from "ofetch";
import DataTable from './DataTable.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';

const props = defineProps<{
  table: DTable,
  crudPath: string
}>()
const loading = ref(false)
const dataTable: Ref<InstanceType<typeof DataTable> | null> = ref(null)

const deleteItem = async (id: string | number) => {
  if (!window.confirm('Hapus item?')) {
    return
  }

  loading.value = true
  try {
    await ofetch(`${props.table.url?.split('?')[0]}/${id}`, {
      method: "DELETE", headers: {
        ...(props.table.headers || {})
      }
    })
    dataTable.value?.fetchData()
  } catch (error) {
    alert('Mohon maaf ada gangguan sistem.')
  }
  loading.value = false
}

defineExpose({
  dataTable
})
</script>

<template>
  <DataTable :table="table" ref="dataTable">
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #column(action)="{ data }">
      <div class="flex justify-center space-x-3">
        <slot name="action" :data="data"></slot>
        <NuxtLink :to="`${crudPath}/${data.id}`"
          class="text-xs font-bold text-blue-500 shadow-none hover:opacity-75">
          EDIT
        </NuxtLink>
        <button class="text-xs font-bold text-blue-500 shadow-none hover:opacity-75" @click="deleteItem(data.id)">
          HAPUS
        </button>
      </div>
    </template>
  </DataTable>
</template>
