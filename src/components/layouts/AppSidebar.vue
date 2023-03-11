<script setup>
import { onMounted } from 'vue'

defineProps({
  title: { type: String, default: 'TBB UI' },
  menus: {
    type: Array,
    default() {
      return { name: 'Dashboard', path: '/' }
    }
  }
})

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
      <div class="h-16 px-6 flex items-center">
        <a href="/" class="flex items-center">
          <img src="/img/logo.png" class="h-7" alt="Logo" />
          <span class="ml-3 text-base font-semibold text-indigo-500 hover:text-indigo-700">{{
            title
          }}</span>
        </a>
      </div>
      <div>
        <div class="my-3">
          <ul class="text-gray-700">
            <li
              v-for="menu in menus"
              :key="menu.path"
              class="hover:bg-slate-100 group hover:text-indigo-600"
            >
              <RouterLink to="/" class="flex items-center gap-3 px-6 py-3">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 512 512"
                    class="h-5 fill-[#c4cff9] group-hover:fill-[#5867dd]"
                  >
                    <g>
                      <path
                        d="M256,319.841c-35.346,0-64,28.654-64,64v128h128v-128C320,348.495,291.346,319.841,256,319.841z"
                      />
                      <g>
                        <path
                          opacity="0.3"
                          d="M362.667,383.841v128H448c35.346,0,64-28.654,64-64V253.26c0.005-11.083-4.302-21.733-12.011-29.696l-181.29-195.99    c-31.988-34.61-85.976-36.735-120.586-4.747c-1.644,1.52-3.228,3.103-4.747,4.747L12.395,223.5    C4.453,231.496-0.003,242.31,0,253.58v194.261c0,35.346,28.654,64,64,64h85.333v-128c0.399-58.172,47.366-105.676,104.073-107.044    C312.01,275.383,362.22,323.696,362.667,383.841z"
                        />
                        <path
                          d="M256,319.841c-35.346,0-64,28.654-64,64v128h128v-128C320,348.495,291.346,319.841,256,319.841z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
                <div class="pt-1">{{ menu.name }}</div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
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
  transition: left 0.3s ease, right 0.3s ease;
}
</style>
