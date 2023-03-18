<script setup>
import AppNavbar from './AppNavbar.vue'
import AppSidebar from './AppSidebar.vue'

defineProps({
  title: {
    type: String,
    default: 'Dashboard'
  },
  settings: {
    type: Object,
    default() {
      return {
        title: 'TBB UI'
      }
    }
  },
  menus: {
    type: Array
  }
})

defineEmits(['logout'])
</script>

<template>
  <div class="h-full flex flex-col">
    <AppSidebar :title="settings.title" :menus="menus" @logout="$emit('logout')"></AppSidebar>
    <AppNavbar :title="settings.title"></AppNavbar>
    <div id="content" class="lg:pl-[265px] flex-grow flex flex-col">
      <div class="pt-5 pb-4 px-5 lg:pb-4 lg:pt-6 lg:px-6 flex justify-between items-center w-full">
        <div class="font-medium text-base"> {{ title }}</div>
        <div>
          <slot name="toolbar"></slot>
        </div>
      </div>
      <div class="px-5 lg:px-6 pb-8 flex-grow">
        <slot></slot>
      </div>
      <div class="bg-white py-3 px-6 text-right">
        <span class="mr-1 text-slate-400">{{ new Date().getFullYear() }}</span> {{ settings.title }}
      </div>
    </div>
  </div>
</template>
