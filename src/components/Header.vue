<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSidebarStore } from '@/stores/sidebar'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const sidebarStore = useSidebarStore()
const authStore = useAuthStore()

const { isShowSidebarMobile, isExpandSidebar, department } = storeToRefs(sidebarStore)
const { authUser } = storeToRefs(authStore)

const {
  showSidebar,
  hideSidebar,
  shrinkSidebar,
  expandSidebar,
  toggleExpandSidebar,
  toggleSidebar
} = sidebarStore

const isShowNotification = ref(false)

function toggleNotification() {
  isShowNotification.value = !isShowNotification.value
}

const notifications: any = [
  {
    id: 1,
    link: 'qqq',
    message: 'Revisi Ujian Proposal Muhammad Bagas Anugerah',
    read_at: '3 years Ago',
    time: '1 tahun yang lalu'
  }
]
const unreadNotifications = 3
</script>

<template>
  <div
    class="fixed top-0 inset-x-0 bg-white z-[100] px-6 h-[65px] hidden md:block" :class="isExpandSidebar ? 'pl-[265px]' : 'pl-[79px]'"
    style="box-shadow: 0 0 40px 0 rgb(82 63 105 / 10%)"
  >
    <div class="flex items-stretch justify-end h-full">
      <div class="flex items-stretch">
        <div class="flex items-center relative">
          <div @click="toggleNotification">
            <div
              class="flex justify-center items-center cursor-pointer rounded hover:bg-[#F3F6F9] text-[#b5b5c3] mr-1 h-[calc(1.5em+1.65rem+2px)] aspect-square px-2"
            >
              <span class="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  class="w-6 h-6 text-primary"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <rect x="0" y="0" width="24" height="24" />
                    <path
                      d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                    <path
                      d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z"
                      fill="currentColor"
                    />
                  </g>
                </svg>
              </span>
              <span class="pulse-ring"></span>
            </div>
          </div>
          <div
            v-if="isShowNotification"
            class="absolute top-0 left-0 will-change-transform w-[350px] bg-white rounded"
            style="
              transform: translate3d(-272px, 65px, 0px);
              box-shadow: 0 0 50px 0 rgba(82, 63, 105, 0.15);
            "
          >
            <form>
              <div
                class="flex flex-col pt-8 pb-6 bg-cover bg-no-repeat rounded-t bg-primary"
                style="background-image: url(/assets/media/misc/bg-1.jpg)"
              >
                <h4 class="flex justify-center items-center rounded-t">
                  <span class="text-white">Notifikasi </span>
                  <span
                    v-if="unreadNotifications"
                    class="rounded px-1 py-0.5 bg-success text-white font-bold ml-2"
                  >
                    {{ unreadNotifications }} baru
                  </span>
                </h4>
              </div>
              <div v-if="notifications.length" class="h-[300px] relative list-none my-4">
                <router-link
                  v-for="notification in notifications"
                  :key="notification.id"
                  :to="notification.link"
                >
                  <div class="px-[1.5em] py-[0.75em] flex items-center hover:bg-secondary">
                    <div class="grow">
                      <div class="font-bold" :class="[notification.read_at && 'text-muted']">
                        {{ notification.message }}
                      </div>
                      <div class="text-muted">
                        {{ notification.time }}
                      </div>
                    </div>
                  </div>
                </router-link>
              </div>
              <div v-else>
                <div class="flex justify-center items-center text-center text-muted min-h-[200px]">
                  All caught up!
                  <br />
                  No new notifications.
                </div>
              </div>
            </form>
          </div>
        </div>
        <!--end: Notifications -->

        <div class="flex items-center">
          <div
            class="w-auto flex items-center px-2 h-[calc(1.5em+1.65rem+2px)] cursor-pointer rounded hover:bg-[#F3F6F9] text-[#b5b5c3]"
          >
            <span class="text-[13px] inline mr-1">Hi,</span>
            <span class="text-[#7e8299] font-black text-[13px] inline mr-3">{{
              authUser.name || ''
            }}</span>
            <span
              class="shrink-0 relative rounded w-9 aspect-square flex items-center bg-[#e5e9ff] justify-center"
            >
              <span class="text-primary text-base font-bold">{{ authUser.initial || '' }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
