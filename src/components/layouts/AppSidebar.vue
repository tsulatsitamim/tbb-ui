<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router';
import IconHome from '../icons/IconHome.vue';


defineProps({
  title: { type: String, default: 'TBB UI' },
  menus: {
    type: Array,
    default() {
      return [{ name: 'Dashboard', path: '/', icon: IconHome }]
    }
  }
})

defineEmits(['logout'])

const route = useRoute()

const closeSidebar = () => {
  document.body.classList.remove('sidebar-active')
}

onMounted(() => {
  document.getElementById('aside-overlay').addEventListener('click', () => {
    document.body.classList.remove('sidebar-active')
  })
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
      <div>
        <div class="my-3">
          <ul class="text-gray-700">
            <template v-for="menu in menus" :key="menu.path">
              <li v-if="menu.show === undefined || menu.show" class="hover:bg-slate-100 group hover:text-indigo-600"
                :class="(route.path === menu.path || (menu.path !== '/' && route.path.includes(menu.path))) && 'bg-slate-100 text-indigo-600'">
                <RouterLink :to="menu.path" class="flex items-center gap-3 px-6 py-3" @click="closeSidebar">
                  <div>
                    <component :is="menu.icon" class="h-5 fill-[#c4cff9] group-hover:fill-[#5867dd]"
                      :class="(route.path === menu.path || (menu.path !== '/' && route.path.includes(menu.path))) && 'fill-[#5867dd]'">
                    </component>
                  </div>
                  <div class="pt-1">{{ menu.name }}</div>
                </RouterLink>
              </li>
            </template>

            <li class="hover:bg-slate-100 group hover:text-indigo-600">
              <button class="flex items-center gap-3 px-6 py-3 w-full" @click="$emit('logout')">
                <div>
                  <component :is="menus[0].icon" class="h-5 fill-[#c4cff9] group-hover:fill-[#5867dd]">
                  </component>
                </div>
                <div class=" pt-1">Logout
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
