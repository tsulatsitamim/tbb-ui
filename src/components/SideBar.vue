<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSidebarStore } from '@/stores/sidebar'
const store = useSidebarStore()

const { isShowSidebarMobile, isExpandSidebar, department } = storeToRefs(store)

const {
  showSidebar,
  hideSidebar,
  shrinkSidebar,
  expandSidebar,
  toggleExpandSidebar,
  toggleSidebar
} = store

const departmentDropdown = ref(false)

function switchDepartment(dep: string) {
  department.value = dep
}

function toggleDepartmentDropdown() {
  departmentDropdown.value = !departmentDropdown.value
}

const programs = [
  { id: 'TKI', title: 'TKI' },
  { id: 'TKM', title: 'TKM' }
]
</script>

<template>
  <div
    :class="{
      'md:max-w-min': !isExpandSidebar,
      hidden: !isShowSidebarMobile,
      'md:flex': isShowSidebarMobile
    }"
    class="fixed flex-col left-0 h-screen bg-white z-[1001] w-[calc(100vw-16px)] max-w-[265px]"
  >
    <div class="px-[25px] flex items-center justify-between h-[67px]">
      <a href="/" class="flex items-center">
        <img alt="Logo" :class="!isExpandSidebar && 'md:hidden'" class="h-8" src="../assets/logo-ugm.png" />
        <span :class="!isExpandSidebar && 'md:hidden'" class="ml-4">{{ department }}</span>
      </a>
      <button class="h-[58px] flex items-center" @click="toggleExpandSidebar">
        <span
          class="hover:text-primary transition-all hover:rotate-180"
          :class="isExpandSidebar ? 'rotate-180 text-primary' : ''"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <polygon points="0 0 24 0 24 24 0 24" />
              <path
                d="M5.29288961,6.70710318 C4.90236532,6.31657888 4.90236532,5.68341391 5.29288961,5.29288961 C5.68341391,4.90236532 6.31657888,4.90236532 6.70710318,5.29288961 L12.7071032,11.2928896 C13.0856821,11.6714686 13.0989277,12.281055 12.7371505,12.675721 L7.23715054,18.675721 C6.86395813,19.08284 6.23139076,19.1103429 5.82427177,18.7371505 C5.41715278,18.3639581 5.38964985,17.7313908 5.76284226,17.3242718 L10.6158586,12.0300721 L5.29288961,6.70710318 Z"
                fill="currentColor"
                fill-rule="nonzero"
                transform="translate(8.999997, 11.999999) scale(-1, 1) translate(-8.999997, -11.999999) "
              />
              <path
                d="M10.7071009,15.7071068 C10.3165766,16.0976311 9.68341162,16.0976311 9.29288733,15.7071068 C8.90236304,15.3165825 8.90236304,14.6834175 9.29288733,14.2928932 L15.2928873,8.29289322 C15.6714663,7.91431428 16.2810527,7.90106866 16.6757187,8.26284586 L22.6757187,13.7628459 C23.0828377,14.1360383 23.1103407,14.7686056 22.7371482,15.1757246 C22.3639558,15.5828436 21.7313885,15.6103465 21.3242695,15.2371541 L16.0300699,10.3841378 L10.7071009,15.7071068 Z"
                fill="currentColor"
                fill-rule="nonzero"
                opacity="0.3"
                transform="translate(15.999997, 11.999999) scale(-1, 1) rotate(-270.000000) translate(-15.999997, -11.999999) "
              />
            </g>
          </svg>
        </span>
      </button>
    </div>
    <div id="sidebar-container" class="my-4 overflow-scroll custom-scroll h-full">
      <ul class="list-none">
        <li class="px-[25px] mb-[30px]">
          <div class="relative" :class="!isExpandSidebar && 'md:w-0 overflow-hidden'">
            <button
              type="button"
              class="group text-primary hover:text-white bg-white border border-primary font-semibold px-4 py-3 inline-flex justify-center w-full rounded-md items-center text-sm hover:bg-primary whitespace-nowrap"
              @click="toggleDepartmentDropdown"
            >
              PILIH PROGRAM STUDI
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-6 h-6 text-primary group-hover:text-white"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <div
              v-if="departmentDropdown"
              class="absolute inset-x-0 bg-white drop-shadow-2xl text-center rounded-md top-[calc(100%+6px)] overflow-hidden z-50"
            >
              <a
                v-for="program in programs"
                :key="program.id"
                class="text-center whitespace-nowrap py-3 w-full block"
                :class="
                  department === program.id
                    ? 'text-white bg-primary hover:text-white'
                    : ' text-primary bg-white hover:bg-slate-100'
                "
                href="#"
                @click="switchDepartment(program.id)"
              >
                {{ program.title }}
              </a>
            </div>
          </div>
        </li>
        <!-- <template v-for="(item, index) in routes">
          <router-link
            v-if="item.path && !item.children && isHasAccess(item)"
            :key="item.path"
            v-slot="{ href, route, navigate, isActive, isExactActive }"
            :to="item.path"
          >
            <li
              class="px-[25px] py-[9px] min-h-[44px] cursor-pointer relative flex flex-grow items-center text-[#3f4254] hover:bg-slate-100 hover:text-primary"
              :class="[
                ((isActive && item.path !== '/') || isExactActive) && 'bg-slate-100 text-primary'
              ]"
            >
              <a :href="href" class="flex items-center hover:text-current" @click="navigate"
                ><span
                  :class="!isExpandSidebar && 'md:w-min'"
                  class="flex w-[35px]"
                  v-html="item.icon"
                ></span
                ><span :class="!isExpandSidebar && 'md:hidden'">{{ item.name }}</span>
                <span v-if="item.badge" :id="item.badge" class="menu-label d-none">
                  <span class="label label-danger label-inline">new</span>
                </span>
              </a>
            </li>
          </router-link>

          <li
            v-if="item.children && isHasAccess(item)"
            :key="item.path"
            class="flex flex-col"
            :class="[$route.path.includes(item.path) && '!bg-slate-100 !text-primary']"
          >
            <a
              href="javascript:;"
              class="px-[25px] py-[9px] min-h-[44px] cursor-pointer relative flex items-center text-[#3f4254] bg-white hover:bg-slate-100 hover:text-primary"
              @click="toggleDropdownSubmenu(index.toString())"
            >
              <span
                class="flex w-[35px]"
                :class="!isExpandSidebar && 'md:w-min'"
                v-html="item.icon"
              ></span>
              <span class="flex-1" :class="!isExpandSidebar && 'md:hidden'">{{ item.name }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5"
                :class="!isExpandSidebar && 'md:hidden'"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <div
              class="overflow-hidden transition-all duration-500 ease-in-out bg-white text-[#3f4254]"
              :class="activeSubmenu.includes(index.toString()) ? 'max-h-[800px]' : 'max-h-0'"
            >
              <span class=""></span>
              <ul class="">
                <router-link
                  v-for="child in item.children"
                  :key="child.path"
                  v-slot="{ href, route, navigate, isActive, isExactActive }"
                  :to="child.path"
                >
                  <li
                    class="pl-10 pr-[25px] min-h-[40px] flex items-center hover:bg-slate-100 hover:text-primary"
                    :class="[isExactActive && 'text-primary bg-slate-100']"
                  >
                    <a
                      :href="href"
                      class="flex items-center space-x-3 hover:text-current"
                      @click="navigate"
                      ><span class="w-1 h-1 rounded-full bg-[#3f4254]"></span
                      ><span :class="!isExpandSidebar && 'md:hidden'">{{ child.name }}</span></a
                    >
                  </li>
                </router-link>
              </ul>
            </div>
          </li>

          <li
            v-if="!item.icon && isHasAccess(item)"
            :key="item.name"
            class="mt-5 px-[25px] flex items-center h-10"
          >
            <h4
              class="text-[.9rem] uppercase font-semibold text-[#7e8299] tracking-wide"
              :class="!isExpandSidebar && 'md:w-0 overflow-hidden'"
            >
              {{ item.name }}
            </h4>
          </li>
        </template> -->
        <li
          class="px-[25px] py-[9px] min-h-[44px] cursor-pointer relative flex flex-grow items-center text-[#3f4254] hover:bg-slate-100 hover:text-primary"
        >
          <a class="flex items-center hover:text-current"
            ><span :class="!isExpandSidebar && 'md:w-min'" class="flex w-[35px]"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24" />
                  <path
                    d="M14.0069431,7.00607258 C13.4546584,7.00607258 13.0069431,6.55855153 13.0069431,6.00650634 C13.0069431,5.45446114 13.4546584,5.00694009 14.0069431,5.00694009 L15.0069431,5.00694009 C17.2160821,5.00694009 19.0069431,6.7970243 19.0069431,9.00520507 L19.0069431,15.001735 C19.0069431,17.2099158 17.2160821,19 15.0069431,19 L3.00694311,19 C0.797804106,19 -0.993056895,17.2099158 -0.993056895,15.001735 L-0.993056895,8.99826498 C-0.993056895,6.7900842 0.797804106,5 3.00694311,5 L4.00694793,5 C4.55923268,5 5.00694793,5.44752105 5.00694793,5.99956624 C5.00694793,6.55161144 4.55923268,6.99913249 4.00694793,6.99913249 L3.00694311,6.99913249 C1.90237361,6.99913249 1.00694311,7.89417459 1.00694311,8.99826498 L1.00694311,15.001735 C1.00694311,16.1058254 1.90237361,17.0008675 3.00694311,17.0008675 L15.0069431,17.0008675 C16.1115126,17.0008675 17.0069431,16.1058254 17.0069431,15.001735 L17.0069431,9.00520507 C17.0069431,7.90111468 16.1115126,7.00607258 15.0069431,7.00607258 L14.0069431,7.00607258 Z"
                    fill="#000000"
                    fill-rule="nonzero"
                    opacity="0.3"
                    transform="translate(9.006943, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-9.006943, -12.000000) "
                  />
                  <rect
                    fill="#000000"
                    opacity="0.3"
                    transform="translate(14.000000, 12.000000) rotate(-270.000000) translate(-14.000000, -12.000000) "
                    x="13"
                    y="6"
                    width="2"
                    height="12"
                    rx="1"
                  />
                  <path
                    d="M21.7928932,9.79289322 C22.1834175,9.40236893 22.8165825,9.40236893 23.2071068,9.79289322 C23.5976311,10.1834175 23.5976311,10.8165825 23.2071068,11.2071068 L20.2071068,14.2071068 C19.8165825,14.5976311 19.1834175,14.5976311 18.7928932,14.2071068 L15.7928932,11.2071068 C15.4023689,10.8165825 15.4023689,10.1834175 15.7928932,9.79289322 C16.1834175,9.40236893 16.8165825,9.40236893 17.2071068,9.79289322 L19.5,12.0857864 L21.7928932,9.79289322 Z"
                    fill="currentColor"
                    fill-rule="nonzero"
                    transform="translate(19.500000, 12.000000) rotate(-90.000000) translate(-19.500000, -12.000000) "
                  />
                </g></svg></span
            ><span :class="!isExpandSidebar && 'md:hidden'">Keluar</span></a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<!-- <style lang="scss">
.aside-minimize {
  .dtmi-logo {
    .logo-text {
      display: none;
    }
  }
}
.dtmi-logo {
  display: flex;
  align-items: center;
  span {
    font-size: 15px;
    font-weight: 600;
  }
}
</style> -->

<style scoped>
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  z-index: 999999;
}

/* Handle */
#sidebar-container::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: transparent;
}

#sidebar-container:hover::-webkit-scrollbar-thumb {
  background-color: grey;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
}
</style>
