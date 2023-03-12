<script setup lang="ts">
withDefaults(defineProps<{
  label?: string
  color?: 'primary' | 'danger' | 'secondary'
  loading?: boolean | number
  disabled?: boolean | number
  compact?: boolean | number
}>(), {
  label: 'Simpan',
  color: 'primary',
})

const colors = {
  primary: 'bg-indigo-500 text-white',
  danger: 'bg-rose-500 text-white',
  secondary: 'bg-slate-200',
}

defineEmits(['click'])
</script>


<template>
  <button class="rounded-md hover:brightness-90 font-semibold inline-flex items-center" :class="`${colors[color]} ${(loading || disabled) && 'opacity-60 cursor-not-allowed disabled'
    } ${compact ? 'px-3 py-2 text-sm' : 'px-5 py-3 '}`" :disabled="!!loading" @click="$emit('click')">
    <div class="relative" :class="`${loading && 'pl-5'}`">
      <!-- TODO: SVG Loading For Campact -->
      <svg v-if="loading" class="animate-spin h-5 w-5 text-white absolute -left-1 top-[2px]"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
      <slot>
        {{ label }}
      </slot>
    </div>
  </button>
</template>
