<script setup lang="ts">
import SideBar from './SideBar.vue'
import HeaderMobile from './HeaderMobile.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import { storeToRefs } from 'pinia'

import { useSidebarStore } from '@/stores/sidebar'

const sidebarStore = useSidebarStore()

const { hideSidebar } = sidebarStore

const { isExpandSidebar, isShowSidebarMobile } = storeToRefs(sidebarStore)
</script>

<template>
  <div class="min-h-screen">
    <HeaderMobile></HeaderMobile>
    <div class="flex flex-row flex-[1_0_auto] h-full relative">
      <div
        v-if="isShowSidebarMobile"
        id="layer-black"
        class="absolute md:hidden w-screen z-[1000] h-screen bg-black/30"
        @click="hideSidebar"
      ></div>
      <SideBar></SideBar>
      <div
        class="flex flex-col justify-between flex-1 pt-[65px] min-w-0 min-h-screen"
        :class="isExpandSidebar ? 'md:pl-[265px]' : 'md:pl-[79px]'"
      >
        <Header></Header>
        <div class="p-4">Test</div>
        <!-- <router-view :key="$route.fullPath" /> -->
        <Footer></Footer>
      </div>
    </div>
    <!-- <Chat></Chat> -->
  </div>
</template>