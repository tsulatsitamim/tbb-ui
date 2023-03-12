<script setup lang="ts">
import type { DTable } from './DataTable.spec'
import type { $Fetch } from "ofetch";
import { ofetch } from "ofetch";
import DataTable from './DataTable.vue';
import { ref } from 'vue';
import type { Ref } from 'vue';

const props = withDefaults(defineProps<{
  table: DTable,
  ofetch?: $Fetch,
  crudPath: string
}>(), {
  ofetch() {
    return ofetch
  }
})

const loading = ref(false)
const dataTable: Ref<InstanceType<typeof DataTable> | null> = ref(null)

const deleteItem = async (id: string | number) => {
  if (!window.confirm('Hapus item?')) {
    return
  }

  loading.value = true
  try {
    await props.ofetch(`${props.table.url}/${id}`, { method: "DELETE" })
    dataTable.value?.fetchData()
  } catch (error) {
    alert('Mohon maaf ada gangguan sistem.')
  }
  loading.value = false
}
</script>

<template>
  <DataTable :table="table" ref="dataTable">
    <template #header>
      <slot name="header"></slot>
    </template>
    <template #column(action)="{ data }">
      <div class="flex justify-center">
        <NuxtLink :to="`${crudPath}/${data.id}`"
          class="text-xs font-bold text-slate-500 shadow-none mr-3 hover:opacity-75">
          EDIT
        </NuxtLink>
        <button class="text-xs font-bold text-slate-500 shadow-none hover:opacity-75" @click="deleteItem(data.id)">
          HAPUS
        </button>
      </div>
    </template>
  </DataTable>
</template>
