<script setup>
defineProps(['modelValue', 'label', 'disabled', 'placeholder', 'type', 'error'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <fieldset class="border border-gray-300 rounded-md py-2 relative text-gray-600">
        <input class="focus:outline-none bg-transparent px-3 peer" @input="emit('update:modelValue', $event.target?.value)">
        <div class="absolute inset-0 flex items-center gap-x-1.5 pointer-events-none px-3 peer-focus:hidden"
            :class="modelValue && 'hidden'">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                class="h-4" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
            </svg>
            <span>{{ label }}</span>
        </div>
        <legend class="font-semibold leading-[0] px-2 ml-2 text-[11px] peer-focus:block text-gray-400"
            :class="!modelValue && 'hidden'">
            {{ label }}
        </legend>
    </fieldset>
</template>