<script setup>
defineProps({
  label: { type: String, default: '' },
})

defineEmits(['input'])
</script>

<template>
  <div>
    <label v-if="label" class="mb-1 ml-1 text-slate-700 block">
      {{ label }}
    </label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
