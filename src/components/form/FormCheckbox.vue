<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
    label: String
    value: Boolean | Object
    modelValue: Array<any> | Boolean
    id: string
}>()
const emit = defineEmits(["update:modelValue"]);
const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>

<template>
    <div class="flex items-center">
        <input :id="id" v-model="model" :value="value" type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
        <label :for="id" class="ml-2">{{ label }}</label>
    </div>
</template>

<style scoped>
[type=checkbox],
[type=radio] {
    appearance: none;
    background-color: #fff;
    border-color: #6b7280;
    border-width: 1px;
}

[type=checkbox]:checked {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 16 16' fill='%23fff' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z'/%3E%3C/svg%3E");
    background-color: currentColor;
}
</style>