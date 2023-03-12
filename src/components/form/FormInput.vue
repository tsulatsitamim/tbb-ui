<script setup>
defineProps({
  modelValue: { type: [String, Number, File], default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  error: { type: String, default: '' },
  help: { type: String, default: '' },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label class="mb-2 ml-1 text-slate-700 block">
      {{ label }}
    </label>
    <div>
      <input v-if="type !== 'file'" :value="modelValue" :type="type"
        class="bg-white border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        :class="{
          'border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500':
            error,
        }" :placeholder="placeholder || `Masukan ${label || 'Input'}`"
        @input="$emit('update:modelValue', $event.target.value)" />
      <input v-else type="file"
        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        :class="{
          'border-red-500 placeholder-red-500 focus:ring-red-500 focus:border-red-500':
            error,
        }" @input="$emit('update:modelValue', $event.target.files[0])" />
      <p v-if="error" class="mt-2 text-sm text-red-600">
        {{ error }}
      </p>
      <p v-if="help" class="mt-2 text-sm text-gray-400">
        {{ help }}
      </p>
    </div>
  </div>
</template>
