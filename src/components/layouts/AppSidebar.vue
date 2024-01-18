<script setup>
import { computed, nextTick, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import IconHome from '../icons/IconHome.vue';
import IconAngleRight from '../icons/IconAngleRight.vue';
import { selectedRoute } from "./selectedRoute";

const props = defineProps({
  title: { type: String, default: 'TBB UI' },
  menus: {
    type: Array,
    default() {
      return [{ name: 'Dashboard', path: '/', icon: IconHome }]
    }
  }
})

const emit = defineEmits(['logout'])

const route = useRoute()

const toggleMenu = (e) => {
  const menu = e.target.closest('li')
  menu.classList.toggle("menu-open")
  const submenuGroup = menu.querySelector('.submenu-group')
  if (submenuGroup) {
    submenuGroup.style.height = menu.classList.contains('menu-open') ? `${submenuGroup.dataset.height}px` : 0
  }
}

const closeSidebar = () => {
  document.body.classList.remove('sidebar-active')
}

const logout = () => {
  closeSidebar()
  emit('logout')
}

onMounted(() => {
  document.getElementById('aside-overlay').addEventListener('click', () => {
    document.body.classList.remove('sidebar-active')
  })

  nextTick(() => {
    const menu = document.querySelector('.menu-open')
    if (menu) {
      const submenuGroup = menu.querySelector('.submenu-group')
      if (submenuGroup) {
        submenuGroup.style.height = `${submenuGroup.dataset.height}px`
      }
    }
  })
})

const activeRoute = computed(() => {
  return selectedRoute(route.path, props.menus.map(x => x.path))
})
</script>

<template>
  <div class="z-[95]">
    <div id="sidebar"
      class="w-[265px] left-[-300px] fixed lg:left-0 top-0 bottom-0 bg-white z-[95] shadow-[0_0_28px_0_rgb(82,63,105,0.08);]">
      <div class="h-16 px-6 flex items-center">
        <a href="/" class="flex items-center">
          <img src="/img/logo.png" class="h-7" alt="Logo" />
          <span class="ml-3 text-base font-semibold text-indigo-500 hover:text-indigo-700">{{
            title
          }}</span>
        </a>
      </div>
      <div class="h-[calc(100%-4rem)] overflow-y-auto pb-10">
        <div class="my-3">
          <ul class="text-gray-700">
            <template v-for="menu in menus" :key="menu.path">
              <template v-if="menu.show !== false">
                <li class="menu" :class="(route.path === menu.path || (menu.path === activeRoute)) && 'menu-open'">
                  <!-- Menu Title -->
                  <div v-if="!menu.path" class="px-6 pt-6 pb-2 uppercase text-[0.675rem] text-gray-500">{{ menu.name }}
                  </div>

                  <!-- Menu Groups -->
                  <template v-else-if="menu.submenus">
                    <button class="px-6 py-3 flex w-full items-center gap-x-3 menu-expand-item" @click="toggleMenu">
                      <div>
                        <div v-if="typeof menu.icon === 'string'" v-html="menu.icon"></div>
                        <component v-else :is="menu.icon" class="h-5 fill-[#c4cff9]">
                        </component>
                      </div>

                      <div class="flex grow justify-between">
                        {{ menu.name }}
                        <IconAngleRight class="w-1 submenu-icon"></IconAngleRight>
                      </div>
                    </button>
                    <div class="submenu-group overflow-hidden" :data-height="menu.submenus.length * 48">
                      <RouterLink v-for="submenu in menu.submenus" :key="submenu.path" :to="submenu.path"
                        class="flex items-center gap-3 px-6 py-3 menu-item pl-10" @click="closeSidebar">
                        <div class="h-1 w-1 rounded-full bg-slate-500 dot-icon"></div>
                        <div class="pt-1">{{ submenu.name }}</div>
                      </RouterLink>
                    </div>
                  </template>

                  <!-- Menu -->
                  <RouterLink v-else :to="menu.path" class="flex items-center gap-3 px-6 py-3 menu-item"
                    :class="menu.path === activeRoute && 'menu-active'" @click="closeSidebar">
                    <div>
                      <div v-if="typeof menu.icon === 'string'" v-html="menu.icon"></div>
                      <component v-else :is="menu.icon" class="svg-component h-5 fill-[#c4cff9]">
                      </component>
                    </div>
                    <div class="pt-1">{{ menu.name }}</div>
                  </RouterLink>

                </li>
              </template>
            </template>

            <li class="group menu">
              <button class="flex items-center gap-3 px-6 py-3 w-full menu-item" @click="logout">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px"
                    height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <rect x="0" y="0" width="24" height="24"></rect>
                      <path
                        d="M14.0069431,7.00607258 C13.4546584,7.00607258 13.0069431,6.55855153 13.0069431,6.00650634 C13.0069431,5.45446114 13.4546584,5.00694009 14.0069431,5.00694009 L15.0069431,5.00694009 C17.2160821,5.00694009 19.0069431,6.7970243 19.0069431,9.00520507 L19.0069431,15.001735 C19.0069431,17.2099158 17.2160821,19 15.0069431,19 L3.00694311,19 C0.797804106,19 -0.993056895,17.2099158 -0.993056895,15.001735 L-0.993056895,8.99826498 C-0.993056895,6.7900842 0.797804106,5 3.00694311,5 L4.00694793,5 C4.55923268,5 5.00694793,5.44752105 5.00694793,5.99956624 C5.00694793,6.55161144 4.55923268,6.99913249 4.00694793,6.99913249 L3.00694311,6.99913249 C1.90237361,6.99913249 1.00694311,7.89417459 1.00694311,8.99826498 L1.00694311,15.001735 C1.00694311,16.1058254 1.90237361,17.0008675 3.00694311,17.0008675 L15.0069431,17.0008675 C16.1115126,17.0008675 17.0069431,16.1058254 17.0069431,15.001735 L17.0069431,9.00520507 C17.0069431,7.90111468 16.1115126,7.00607258 15.0069431,7.00607258 L14.0069431,7.00607258 Z"
                        fill="#000000" fill-rule="nonzero" opacity="0.3"
                        transform="translate(9.006943, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-9.006943, -12.000000) ">
                      </path>
                      <rect fill="#000000" opacity="0.3"
                        transform="translate(14.000000, 12.000000) rotate(-270.000000) translate(-14.000000, -12.000000) "
                        x="13" y="6" width="2" height="12" rx="1"></rect>
                      <path
                        d="M21.7928932,9.79289322 C22.1834175,9.40236893 22.8165825,9.40236893 23.2071068,9.79289322 C23.5976311,10.1834175 23.5976311,10.8165825 23.2071068,11.2071068 L20.2071068,14.2071068 C19.8165825,14.5976311 19.1834175,14.5976311 18.7928932,14.2071068 L15.7928932,11.2071068 C15.4023689,10.8165825 15.4023689,10.1834175 15.7928932,9.79289322 C16.1834175,9.40236893 16.8165825,9.40236893 17.2071068,9.79289322 L19.5,12.0857864 L21.7928932,9.79289322 Z"
                        fill="#000000" fill-rule="nonzero"
                        transform="translate(19.500000, 12.000000) rotate(-90.000000) translate(-19.500000, -12.000000) ">
                      </path>
                    </g>
                  </svg>
                </div>
                <div class="pt-1">Logout
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="aside-overlay" class="z-[94] hidden fixed inset-0 overflow-hidden bg-black/10"></div>
  </div>
</template>

<style lang="postcss">
body.sidebar-active #sidebar {
  left: 0 !important;
}

body.sidebar-active #aside-overlay {
  display: block;
}

#sidebar {
  transition: left 0.3s ease, right 0.3s ease;

  .menu {
    .submenu-group {
      height: 0;
      transition: height 0.5s ease-in-out;
    }

    &.menu-open {
      .menu-expand-item {
        color: #5867dd;
        background-color: rgb(241 245 249);
      }

      .submenu-icon {
        transform: rotate(90deg);
      }
    }
  }

  .menu-item,
  .menu-expand-item {

    &.menu-active,
    &:hover {
      color: #5867dd;
      background-color: rgb(241 245 249);

      .dot-icon {
        background-color: #5867dd;
      }

      svg g [fill],
      .svg-component {
        transition: fill .3s ease;
        fill: #5867dd;
      }
    }

    svg g [fill] {
      fill: #c4cff9;
    }
  }
}
</style>
