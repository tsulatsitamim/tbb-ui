<script setup>
import { computed } from 'vue';

const props = defineProps(['modelValue', 'label', 'disabled', 'placeholder', 'type', 'error', 'items', 'cache'])
const emit = defineEmits(['update:modelValue'])

const update = (e) => {
    if (props.cache) {
        localStorage.setItem(props.cache, e.target.value)
    }
    emit('update:modelValue', e.target.value)
}

const mappedItems = computed(() => (props.items || []).map((x) => typeof x === 'string' ? ({ id: x, name: x }) : x))
const selectedItem = computed(() => mappedItems.value.find(x => x.id == props.modelValue))
</script>

<template>
    <fieldset class="border border-gray-300 rounded-md py-2 relative text-gray-600 pr-3">
        <select class="focus:outline-none bg-transparent px-3 peer w-full" :value="modelValue" @input="update">
            <option v-for="item in mappedItems" :value="item.id" :key="item.id">{{ item.name }}</option>
        </select>
        <legend class="leading-[0] px-2 ml-2 peer-focus:block text-gray-400"
            :class="selectedItem ? 'font-semibold text-[11px]' : 'absolute top-1/2 transform -translate-y-1/2'">
            {{ label }}
        </legend>
    </fieldset>
</template>