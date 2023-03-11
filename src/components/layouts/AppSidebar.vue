<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  document.getElementById('aside-overlay').addEventListener('click', () => {
    document.body.classList.remove('sidebar-active')
  })
})
</script>

<template>
  <div class="z-[95]">
    <div
      id="sidebar"
      class="w-[265px] left-[-300px] fixed lg:left-0 top-0 bottom-0 bg-white z-[95] shadow-[0_0_28px_0_rgb(82,63,105,0.08);]"
    >
      asidex
    </div>
    <div id="aside-overlay" class="z-[94] hidden fixed inset-0 overflow-hidden bg-black/10"></div>
  </div>
</template>

<style>
body.sidebar-active #sidebar {
    left: 0 !important;
}

body.sidebar-active #aside-overlay {
    display: block;
}

#sidebar {
    transition: left .3s ease, right .3s ease;
}
</style>