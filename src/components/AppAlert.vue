<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

const classes = {
    success: {
        wrapper: 'text-green-800 bg-green-50 ',
        content: 'focus:ring-green-400  hover:bg-green-200 bg-green-50 text-green-500'
    },
    danger: {
        wrapper: 'text-rose-800 bg-rose-50 ',
        content: 'focus:ring-rose-400  hover:bg-rose-200 bg-rose-50 text-rose-500'
    }
}
const alertType: Ref<'success' | 'danger'> = ref('success')
const alertMessage = ref('')

const close = () => {
    alertMessage.value = ''
}

const open = (type: 'success' | 'danger' = 'success', message = '') => {
    alertType.value = type
    alertMessage.value = message ? message : (type === 'success' ? 'Data berhasil disimpan.' : 'Mohon maaf ada gangguan sistem.')
}

defineExpose({ open, close })
</script>

<template>
    <div v-if="alertMessage" class="flex p-4 mb-4 rounded-lg" :class="classes[alertType].wrapper" role="alert">
        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"></path>
        </svg>
        <span class="sr-only">Info</span>
        <div class="ml-3 text-sm font-medium">
            {{ alertMessage }}
        </div>
        <button type="button" @click="close"
            class="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8"
            :class="classes[alertType].wrapper" data-dismiss-target="#alert-2" aria-label="Close">
            <span class="sr-only">Close</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
        </button>
    </div>
</template>