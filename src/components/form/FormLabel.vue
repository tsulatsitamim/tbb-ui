<script setup>
defineProps({
  label: { type: String, default: '' },
})

defineEmits(['input'])
</script>

<template>
  <div>
    <label v-if="label" class="tw-mb-2 tw-ml-1 tw-text-slate-700 tw-block">
      {{ label }}
    </label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
