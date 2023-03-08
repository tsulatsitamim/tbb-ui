<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSidebarStore } from '@/stores/sidebar'
import { useAuthStore } from '@/stores/auth'
import { intersection } from 'ramda'
import tokenService from '../services/token.service'

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

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <polygon points="0 0 24 0 24 24 0 24"/>
                <path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" fill="currentColor" fill-rule="nonzero"/>
                <path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" fill="currentColor" opacity="0.3"/>
            </g>
          </svg>`
  },
  {
    path: '/chat',
    name: 'Chat',
    badge: 'badge-chat',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24"/>
                  <path d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z" fill="currentColor"/>
                  <path d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z" fill="currentColor" opacity="0.3"/>
              </g>
          </svg>`
  },
  {
    path: '/dosen/sarjana/mbkm',
    name: 'MBKM',
    position_id: 3,
    departments: ['TKI'],
    icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="24" height="24"/>
                        <path d="M13,17.0484323 L13,18 L14,18 C15.1045695,18 16,18.8954305 16,20 L8,20 C8,18.8954305 8.8954305,18 10,18 L11,18 L11,17.0482312 C6.89844817,16.5925472 3.58685702,13.3691811 3.07555009,9.22038742 C3.00799634,8.67224972 3.3975866,8.17313318 3.94572429,8.10557943 C4.49386199,8.03802567 4.99297853,8.42761593 5.06053229,8.97575363 C5.4896663,12.4577884 8.46049164,15.1035129 12.0008191,15.1035129 C15.577644,15.1035129 18.5681939,12.4043008 18.9524872,8.87772126 C19.0123158,8.32868667 19.505897,7.93210686 20.0549316,7.99193546 C20.6039661,8.05176407 21.000546,8.54534521 20.9407173,9.09437981 C20.4824216,13.3000638 17.1471597,16.5885839 13,17.0484323 Z" fill="currentColor" fill-rule="nonzero"/>
                        <path d="M12,14 C8.6862915,14 6,11.3137085 6,8 C6,4.6862915 8.6862915,2 12,2 C15.3137085,2 18,4.6862915 18,8 C18,11.3137085 15.3137085,14 12,14 Z M8.81595773,7.80077353 C8.79067542,7.43921955 8.47708263,7.16661749 8.11552864,7.19189981 C7.75397465,7.21718213 7.4813726,7.53077492 7.50665492,7.89232891 C7.62279197,9.55316612 8.39667037,10.8635466 9.79502238,11.7671393 C10.099435,11.9638458 10.5056723,11.8765328 10.7023788,11.5721203 C10.8990854,11.2677077 10.8117724,10.8614704 10.5073598,10.6647638 C9.4559885,9.98538454 8.90327706,9.04949813 8.81595773,7.80077353 Z" fill="currentColor" opacity="0.3"/>
                    </g>
                </svg>`,
    showInSidebar: true
  },
  {
    name: 'Akun'
  },
  {
    path: '/user/me',
    name: 'Edit Akun',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <polygon points="0 0 24 0 24 24 0 24"/>
                  <path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z" fill="currentColor" fill-rule="nonzero" opacity="0.3"/>
                  <path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z" fill="currentColor" fill-rule="nonzero"/>
              </g>
          </svg>`
  }
]

function isHasAccess({ position_id, roles, departments }: any) {
  if (departments && !departments.includes(tokenService.getDepartment())) {
    return false
  }

  if (!position_id && !roles) {
    return true
  }

  if (roles) {
    return intersection(authUser ? authUser.value.roles : [], roles).length
  }

  return position_id === authUser.value.positionId || false
}
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
    <div class="px-[25px] items-center justify-between h-[67px] hidden md:flex">
      <a href="/" class="flex items-center">
        <img
          alt="Logo"
          :class="!isExpandSidebar && 'md:hidden'"
          class="h-8"
          src="../assets/logo-ugm.png"
        />
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
        <li class="px-[25px] mb-[30px] hidden md:block">
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
        <template v-for="(item, index) in routes" :key="index">
          <router-link
            v-if="item.path && !item.children"
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
              <a
                :href="href"
                class="flex items-center hover:text-current relative"
                @click="navigate"
                ><span
                  :class="!isExpandSidebar && 'md:w-min'"
                  class="flex w-[35px]"
                  v-html="item.icon"
                ></span
                ><span :class="!isExpandSidebar && 'md:hidden'">{{ item.name }}</span>
                <span
                  v-if="item.badge"
                  :id="item.badge"
                  class="absolute bottom-1/2 bg-primary text-white text-xs rounded-full left-full"
                  :class="!isExpandSidebar ? 'md:left-1/2' : 'md:left-full '"
                >
                  <span class="bg-primary text-white px-1.5 py-0.5 text-xs rounded-full">new</span>
                </span>
              </a>
            </li>
          </router-link>

          <li
            v-if="item.children"
            :key="item.path"
            class="flex flex-col"
            :class="[$route.path.includes(item.path) && '!bg-slate-100 !text-primary']"
          >
            <a
              href="javascript:;"
              class="px-[25px] py-[9px] min-h-[44px] cursor-pointer relative flex items-center text-[#3f4254] bg-white hover:bg-slate-100 hover:text-primary"
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

          <!-- Divider -->
          <li v-if="!item.icon" class="mt-5 px-[25px] flex items-center h-10">
            <h4
              class="text-[.9rem] uppercase font-semibold text-[#7e8299] tracking-wide"
              :class="!isExpandSidebar && 'md:w-0 overflow-hidden'"
            >
              {{ item.name }}
            </h4>
          </li>
        </template>
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
