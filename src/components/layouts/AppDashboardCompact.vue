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
  },
  userName: {
    type: String
  }
})

defineEmits(['logout'])
</script>

<template>
  <div class="h-full flex flex-col">
    <AppSidebar
      v-if="userName"
      :title="settings.title"
      :menus="menus"
      @logout="$emit('logout')"
    ></AppSidebar>
    <AppNavbar v-if="userName" :title="settings.title" :user-name="userName"></AppNavbar>
    <div id="content" class="lg:pl-[265px] flex flex-col">
      <div class="grow">
        <slot></slot>
      </div>
      <div class="bg-white py-3 px-6 text-right">
        <span class="mr-1 text-slate-400">{{ new Date().getFullYear() }}</span> {{ settings.title }}
      </div>
    </div>
  </div>
</template>
