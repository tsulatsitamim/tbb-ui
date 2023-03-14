<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { DTable } from './DataTable.spec'
import Footer from './TableFooter.vue'

type NV = <T>(item: any, arr: string[]) => T;
const getNestedValue: NV = (item, arr) => {
  if (arr.length === 1) {
    return item[arr[0]]
  }

  return getNestedValue<NV>(item[arr.shift() as string], arr)
}

const props = defineProps<{
  table: DTable
  loading?: boolean
}>()

const pagination = reactive({
  page: 1,
  pages: 1,
  perpage: 10,
  total: 1,
})

const rows: Ref<any[]> = ref([])
const remoteLoading = ref(false)
const query = ref('')
const sortField = ref('')
const sortSort = ref('asc')

const mapUnpaginatedData = (data: any[]) => {
  const keys = props.table.columns.map((x) => x.field)
  const filteredData = query.value
    ? data.filter((row) =>
      keys.some(
        (key) =>
          row[key] &&
          JSON.stringify(row[key]).toLowerCase().includes(query.value.toLowerCase())
      )
    )
    : data

  rows.value = filteredData.slice(
    (pagination.page - 1) * pagination.perpage,
    pagination.page * pagination.perpage
  ).map(props.table.mapper ? props.table.mapper : (x) => x)

  pagination.pages = Math.ceil((filteredData.length || 1) / pagination.perpage)
  pagination.total = filteredData.length
}

const fetchData = async () => {
  if (!props.table.url) {
    if (props.table.data) {
      mapUnpaginatedData(props.table.data)
    }
    return
  }

  remoteLoading.value = true

  try {
    const { data } = await axios.get(
      `${props.table.url}${props.table.url.includes('?') ? '&' : '?'}pagination[page]=${pagination.page
      }&pagination[perpage]=${pagination.perpage}&query=${query.value}`
    )

    if (!data.meta) {
      remoteLoading.value = false
      return mapUnpaginatedData(data.data)
    }

    rows.value = data.data
    // pagination.page = data.meta.page
    pagination.pages = Math.ceil((data.meta.total || 1) / data.meta.perpage)
    pagination.total = data.meta.total
    // pagination.perpage = data.meta.perpage
  } catch (error) {
    console.log(error)
    alert('Gagal mengambil data.')
  }

  remoteLoading.value = false
}

let debounce: any
const debouceFetchData = () => {
  clearTimeout(debounce)
  debounce = setTimeout(() => {
    fetchData()
  }, 300)
}

watch(() => props.table.url, debouceFetchData)
watch(() => props.table.data, fetchData)
watch(query, debouceFetchData)

onMounted(async () => {
  if (!props.table.disableInit) {
    await fetchData()
  }
})

const updatePagination = (e: { page: number, perpage: number }) => {
  pagination.page = e.page
  pagination.perpage = e.perpage

  fetchData()
}

defineExpose({ fetchData })

const sort = () => { }
</script>

<template>
  <div class="bg-white py-5 px-6 lg:py-6 lg:px-7 rounded-md">
    <div class="md:flex mb-8">
      <div v-if="table.search !== false" class="md:w-72 mb-5 md:mb-0">
        <div class="w-full border border-gray-300 py-2 px-3 rounded-md flex items-center">
          <svg fill="none" stroke="currentColor" class="text-gray-400 h-5 mr-2" stroke-width="1.5" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
          </svg>
          <input v-model="query" type="text" class="w-full focus:outline-none" placeholder="Search..." />
        </div>
      </div>
      <slot name="header"></slot>
    </div>
    <div class="overflow-x-auto relative">
      <table class="min-w-full" :class="(remoteLoading || loading) && 'pointer-events-none'">
        <thead>
          <tr class="border-b">
            <th v-for="column in table.columns" :key="column.title" class="py-3 px-5 font-medium text-left"
              :class="column.class" @click="sort">
              {{ column.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in rows" :key="row.id" class="border-b last:border-b-0">
            <td v-for="column in table.columns" :key="row.id + '_' + i + '_' + column.field" class="py-4 px-5"
              :class="column.class">
              <slot :name="`column(${column.field})`" :data="row">
                {{ getNestedValue(row, column.field.split('.')) }}
              </slot>
            </td>
          </tr>
          <tr v-if="!rows.length" class="border-b last:border-b-0">
            <td :colspan="table.columns.length" class="py-4 px-5 text-center">
              No records found
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="remoteLoading || loading"
        class="absolute shadow-all bg-white px-5 py-3 rounded-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center space-x-3">
        <span>Please Wait</span>
        <span class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </span>
      </div>
    </div>

    <Footer :pagination="pagination" @update="updatePagination"></Footer>
  </div>
</template>

<style scoped>
.shadow-all {
  box-shadow: 0 0 50px 0 rgb(82 63 105 / 15%);
}

.lds-ring {
  display: inline-block;
  position: relative;
  width: 13px;
  height: 13px;
}

.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 13px;
  height: 13px;
  border: 2px solid #3f4254;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #3f4254 transparent transparent transparent;
}

.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}

.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}

.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
