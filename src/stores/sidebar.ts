import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
  const isExpandSidebar = ref(true)
  const isShowSidebarMobile = ref(false)
  const department = ref('TKI S2')
  
  function toggleExpandSidebar() {
    isExpandSidebar.value = !isExpandSidebar.value
  }

  function toggleSidebar() {
    isShowSidebarMobile.value = !isShowSidebarMobile.value
  }

  function showSidebar() {
    isShowSidebarMobile.value = true
  }

  function hideSidebar() {
    isExpandSidebar.value = false
  }

  function expandSidebar() {
    isExpandSidebar.value = true
  }

  function shrinkSidebar() {
    isExpandSidebar.value = false
  }

  return { expandSidebar, toggleExpandSidebar, showSidebar, shrinkSidebar, hideSidebar, toggleSidebar, isExpandSidebar, isShowSidebarMobile, department }
})
