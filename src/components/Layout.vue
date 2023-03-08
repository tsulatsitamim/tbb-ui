<script setup lang="ts">
import SideBar from './SideBar.vue';
import HeaderMobile from './HeaderMobile.vue';
</script>

<template>
  <div class="flex flex-col flex-[1]">
    <HeaderMobile></HeaderMobile>
    <div class="flex flex-row flex-[1_0_auto]">
      <!-- <SideBar></SideBar> -->
      <!-- <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
        <Header></Header>
        <router-view :key="$route.fullPath" />
        <Footer></Footer>
      </div> -->
    </div>
    <!-- <Chat></Chat> -->
  </div>
</template>
