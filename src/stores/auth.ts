import { ref } from 'vue'
import { defineStore } from 'pinia'
import { initial } from '@/helpers/initial'

export const useAuthStore = defineStore('auth', () => {
  const authUser = ref({
    id: 1,
    name: 'Aditia Kusuma',
    email: 'aditiakusuma@gmail.com',
    positionId: 1,
    roles: '',
    initial: initial('Aditia Kusuma')
  })

  return { authUser }
})
