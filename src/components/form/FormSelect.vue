<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  modelValue?: string | number | null | boolean
  label?: string
  placeholder?: string
  items: any[]
  disabled?: boolean | string | number
  error?: string
}>(), {
  modelValue: '',
  label: '',
  placeholder: '',
  disabled: false,
  error: '',
})

const localValue = ref('')

const emit = defineEmits(['update:modelValue'])
const update = (e: any) => {
  emit('update:modelValue', e.target.value)
  localValue.value = e.target.value
}

</script>

<template>
  <div class="w-full">
    <label v-if="label" class="mb-1 ml-1 text-slate-700 block">{{ label }}</label>
    <div>
      <div class="select-wrapper relative">
        <select :value="modelValue"
          class="appearance-none border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-6 py-2"
          :class="`${modelValue === '' ? 'text-gray-300' : 'text-slate-700'} ${disabled ? 'bg-gray-100' : 'bg-white'
            } ${error &&
            'text-red-500 border-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
            }`" :disabled="!!disabled" @input="update">
          <option value="" disabled selected>
            {{ placeholder || `Pilih ${label || 'Item'}` }}
          </option>
          <option v-for="item in items.filter(x => x)" :key="item.id" :value="item.id"
            :selected="item.id == modelValue || item.id == localValue">
            {{ item.name }}
          </option>
        </select>
        <p v-if="error" class="mt-2 text-xs text-red-600 dark:text-red-500">
          {{ error }}
        </p>

        <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true" class="h-4 absolute right-1 top-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

