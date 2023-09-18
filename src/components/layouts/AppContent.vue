<script setup lang="ts">
defineProps<{
  title: string
  fullWidth?: boolean
}>()
</script>

<template>
  <div
    class="flex flex-col flex-grow flex-shrink-0 px-3 lg:px-6 mx-auto w-full"
    :class="!fullWidth && 'max-w-[1340px]'"
  >
    <!-- Header -->
    <div class="flex items-center justify-between py-4 lg:pt-8 lg:pb-6">
      <div>
        <h5 class="text-lg font-medium">
          {{ title }}
        </h5>
      </div>
      <div>
        <slot name="toolbar"></slot>
      </div>
    </div>

    <!-- Content -->
    <slot></slot>
  </div>
</template>
