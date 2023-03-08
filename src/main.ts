import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// import './assets/main.css'
import './assets/tailwind.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
  ]
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
