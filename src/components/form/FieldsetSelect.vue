<script setup>
defineProps(['modelValue', 'label', 'disabled', 'placeholder', 'type', 'error', 'items'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
    <fieldset class="border border-gray-300 rounded-md py-2 relative text-gray-600 pr-3">
        <select class="focus:outline-none bg-transparent px-3 peer w-full" :value="modelValue"
            @input="emit('update:modelValue', $event.target.value)">
            <option v-for="item in items" :value="item.id" :key="item.id">{{ item.name }}</option>
        </select>
        <legend class="font-semibold leading-[0] px-2 ml-2 text-[11px] peer-focus:block text-gray-400"
            :class="!modelValue && 'hidden'">
            {{ label }}
        </legend>
    </fieldset>
</template>