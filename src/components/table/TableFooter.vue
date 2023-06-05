<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{
  pagination: {
    page: number
    pages: number
    perpage: number
    total: number
  }
}>()

const emit = defineEmits(['update'])

const activePage = ref(1)
const perpage = ref(10)
const selectPerpage = ref(false)

const visiblePages = computed(() => {
  const activeGroupIndex = Math.floor((activePage.value - 1) / 4)

  return [...Array(props.pagination.pages)]
    .map((_, i) => 1 + i)
    .slice(activeGroupIndex * 4, activeGroupIndex * 4 + 4)
})

const emitUpdate = () => {
  emit('update', { page: activePage.value, perpage: perpage.value })
}

const setActivePage = (page: number) => {
  activePage.value = page
  emitUpdate()
}

const setPerpage = (n: number) => {
  perpage.value = n
  activePage.value = 1
  emitUpdate()
}

const prevPage = () => {
  if (activePage.value === 1) {
    return
  }

  activePage.value -= 1
  emitUpdate()
}
const nextPage = () => {
  if (activePage.value === props.pagination.pages) {
    return
  }

  activePage.value += 1
  emitUpdate()
}
</script>

<template>
  <div class="flex flex-wrap gap-5 justify-between mt-5">
    <div class="flex gap-2">
      <button class="h-7 w-7 bg-slate-100 rounded-md flex items-center justify-center" :class="activePage === 1
        ? 'cursor-default opacity-60'
        : 'hover:bg-indigo-500 hover:text-white'
        " :disabled="activePage === 1" @click="setActivePage(1)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-5 h-5 fill-gray-400">
          <path fill-rule="evenodd"
            d="M15.79 14.77a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L11.832 10l3.938 3.71a.75.75 0 01.02 1.06zm-6 0a.75.75 0 01-1.06.02l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 111.04 1.08L5.832 10l3.938 3.71a.75.75 0 01.02 1.06z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <button class="h-7 w-7 bg-slate-100 rounded-md flex items-center justify-center" :class="activePage === 1
        ? 'cursor-default opacity-60'
        : 'hover:bg-indigo-500 hover:text-white'
        " :disabled="activePage === 1" @click="prevPage">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-5 h-5 fill-gray-400">
          <path fill-rule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <button v-for="page in visiblePages" :key="page" class="h-7 w-7 rounded-md hover:bg-indigo-500 hover:text-white"
        :class="page === activePage ? 'bg-indigo-500 text-white' : 'text-slate-500'" @click="setActivePage(page)">
        {{ page }}
      </button>

      <button class="h-7 w-7 bg-slate-100 rounded-md flex items-center justify-center" :class="activePage === pagination.pages
        ? 'cursor-default opacity-60'
        : 'hover:bg-indigo-500 hover:text-white'
        " :disabled="activePage === pagination.pages" @click="nextPage">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-5 h-5 fill-gray-400">
          <path fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <button class="h-7 w-7 bg-slate-100 rounded-md flex items-center justify-center" :class="activePage === pagination.pages
        ? 'cursor-default opacity-60'
        : 'hover:bg-indigo-500 hover:text-white'
        " :disabled="activePage === pagination.pages" @click="setActivePage(pagination.pages)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-5 h-5 fill-gray-400">
          <path fill-rule="evenodd"
            d="M10.21 14.77a.75.75 0 01.02-1.06L14.168 10 10.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd" />
          <path fill-rule="evenodd"
            d="M4.21 14.77a.75.75 0 01.02-1.06L8.168 10 4.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div class="flex items-center space-x-5">
      <button
        class="flex items-center justify-between w-[4.5rem] bg-slate-100 px-3 h-7 rounded-md relative focus:pointer-events-nonex hover:bg-indigo-500 hover:text-white focus:bg-indigo-500 focus:text-white"
        @click="selectPerpage = !selectPerpage">
        <div>{{ pagination.perpage }}</div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
            <path fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd" />
          </svg>
        </div>
        <div v-if="selectPerpage" class="dropdown py-2 absolute bg-white w-full -top-44 left-0 text-gray-500 rounded-md">
          <div class="py-2 px-3 hover:bg-slate-100" @click="setPerpage(10)">10</div>
          <div class="py-2 px-3 hover:bg-slate-100" @click="setPerpage(20)">20</div>
          <div class="py-2 px-3 hover:bg-slate-100" @click="setPerpage(50)">50</div>
          <div class="py-2 px-3 hover:bg-slate-100" @click="setPerpage(100)">100</div>
        </div>
      </button>
      <div>
        Showing
        {{ (activePage - 1) * pagination.perpage + 1 }} -
        {{
          activePage * pagination.perpage > pagination.total
          ? pagination.total
          : activePage * pagination.perpage
        }}
        of
        {{ pagination.total }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  box-shadow: 0 0 50px 0 rgb(82 63 105 / 15%);
}
</style>
