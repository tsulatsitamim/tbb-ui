<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: string | number | null | File
  label?: string,
  placeholder?: string,
  type?: string,
  error?: string,
  help?: string,
  accept?: string,
}>(), {
  type: 'text',
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label v-if="label" class="mb-1 ml-1 text-slate-700 block">
      {{ label }}
    </label>
    <div>
      <input v-if="type !== 'file'" :value="modelValue" :type="type"
        class="bg-white border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2"
        :class="{
          'border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500':
            error,
        }" :placeholder="placeholder || `Masukan ${label || 'Input'}`"
        @input="$emit('update:modelValue', ($event!.target as HTMLInputElement).value)" />
      <input v-else type="file" :accept="accept"
        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2"
        :class="{
          'border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500':
            error,
        }" @input="$emit('update:modelValue', ($event!.target as HTMLInputElement).files![0])" />
      <p v-if="error" class="mt-2 text-sm text-red-600">
        {{ error }}
      </p>
      <p v-if="help" class="mt-2 text-sm text-gray-400">
        {{ help }}
      </p>
    </div>
  </div>
</template>
