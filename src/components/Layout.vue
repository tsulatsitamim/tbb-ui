<script setup lang="ts">
import SideBar from './SideBar.vue';
import HeaderMobile from './HeaderMobile.vue';
import Footer from './Footer.vue';
</script>

<template>
  <div class="flex flex-col flex-[1]">
    <HeaderMobile></HeaderMobile>
    <div class="flex flex-row flex-[1_0_auto]">
      <!-- <SideBar></SideBar> -->
      <div class="flex flex-col flex-[1_auto] pt-[55px] min-w-0">
        <!-- <Header></Header> -->
        <!-- <router-view :key="$route.fullPath" /> -->
        <Footer></Footer>
      </div>
    </div>
    <!-- <Chat></Chat> -->
  </div>
</template>
