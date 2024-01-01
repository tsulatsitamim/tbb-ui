<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string | null
  label: string
  placeholder?: string
  error?: string
  help?: string
  rows?: number | string
  disabled?: boolean
}>(), {
  rows: 3,
  disabled: false
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label v-if="label" class="mb-2 ml-1 text-slate-700 block">
      {{ label }}
    </label>
    <div>
      <textarea :value="modelValue as any"
        class="border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        :placeholder="placeholder || `Masukan ${label || 'Input'}`" :class="{
          'border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500':
            error,
          'cursor-not-allowed bg-slate-100': disabled,
          'bg-white ': !disabled
        }" :rows="rows" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :disabled="disabled" />
      <p v-if="error" class="mt-1 text-xs text-red-600 dark:text-red-500">
        {{ error }}
      </p>
      <p v-if="help" class="mt-1 text-xs text-gray-400">
        {{ help }}
      </p>
    </div>
  </div>
</template>
