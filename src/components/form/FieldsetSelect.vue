<script setup>
const props = defineProps(['modelValue', 'label', 'disabled', 'placeholder', 'type', 'error', 'items', 'cache'])
const emit = defineEmits(['update:modelValue'])

const update = (e) => {
    if (props.cache) {
        localStorage.setItem(props.cache, e.target.value)
    }
    emit('update:modelValue', e.target.value)
}

const mapper = (x) => typeof x === 'string' ? ({id: x, name: x}) : x
</script>

<template>
    <fieldset class="border border-gray-300 rounded-md py-2 relative text-gray-600 pr-3">
        <select class="focus:outline-none bg-transparent px-3 peer w-full" :value="modelValue"
            @input="update">
            <option v-for="item in mapper(items)" :value="item.id" :key="item.id">{{ item.name }}</option>
        </select>
        <legend class="font-semibold leading-[0] px-2 ml-2 text-[11px] peer-focus:block text-gray-400"
            :class="!modelValue && 'hidden'">
            {{ label }}
        </legend>
    </fieldset>
</template>