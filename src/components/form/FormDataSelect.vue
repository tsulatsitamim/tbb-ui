<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import FormLabel from './FormLabel.vue'

const props = defineProps({
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    value: {
        type: [String, Number, Array],
        default() {
            return []
        },
    },
    items: {
        type: Array,
        default() {
            return []
        },
    },
})

const query = ref('')
const input = ref(null)
const container = ref(null)
const selector = ref(null)

const popup = ref(false)

const emit = defineEmits(['input'])

const selectedItems = ref([])

const displayedItems = computed(() => {
    const ids = selectedItems.value.map((x) => x.id)
    return props.items
        .filter((x) => (x.name || '').toLowerCase().includes(query.value.toLowerCase()))
        .map((x) => ({
            ...x,
            selected: ids.includes(x.id),
        }))
})

const pushItem = (item) => {
    query.value = ''
    selectedItems.value.push(item)
    emit(
        'input',
        selectedItems.value.map((x) => x.id)
    )
}

const removeItem = (i) => {
    query.value = ''
    setTimeout(() => {
        selectedItems.value.splice(i, 1)
        emit(
            'input',
            selectedItems.value.map((x) => x.id)
        )
    }, 50)
}

const focus = () => {
    input.value.focus()
}

const updateSelectedItems = () => {
    selectedItems.value = props.items.filter((x) => props.value.includes(x.id))
}

watch(
    () => props.items,
    () => {
        updateSelectedItems()
    }
)

watch(
    () => props.value,
    () => {
        updateSelectedItems()
    }
)

onMounted(() => {
    window.addEventListener('click', (e) => {
        if (!selector.value) {
            return
        }

        if (!container.value.contains(e.target)) {
            popup.value = false
        }
    })
})
</script>

<template>
    <!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
    <FormLabel :label="label">
        <div ref="container"
            class="appearance-none border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-6 py-2 text-slate-700 bg-white relative"
            :class="popup && 'border-blue-500'" @click="focus">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true" class="h-4 absolute right-1 top-[10px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
            </svg>

            <ul class="flex flex-wrap items-center">
                <li v-for="(item, i) in selectedItems" :key="item.id" class="py-1" @click="removeItem(i)">
                    <span
                        class="bg-gray-200 text-gray-800 text-sm inline-flex items-center px-2.5 py-1 rounded mr-2 cursor-pointer">
                        {{ item.name }}
                        <svg class="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                            </path>
                        </svg>
                    </span>
                </li>
                <li class="flex-grow">
                    <input ref="input" v-model="query" size="1" type="text" class="outline-none w-full"
                        :placeholder="selectedItems.length ? '' : placeholder || `Pilih ${label || 'Item'}`"
                        @focus="popup = true" />
                </li>
            </ul>
        </div>
        <div v-if="popup" ref="selector" class="relative">
            <div
                class="w-full absolute bg-white top-0 max-h-48 overflow-y-scroll z-10 border border-gray-300 text-gray-900 shadow-md">
                <ul>
                    <li v-for="item in displayedItems" :key="item.id" class="py-2 px-5 cursor-pointer hover:bg-slate-100"
                        :class="{ 'bg-slate-100': item.selected }" @click="
                            item.selected
                                ? removeItem(selectedItems.findIndex((x) => x.id === item.id))
                                : pushItem(item)
                            ">
                        {{ item.name }}
                    </li>
                </ul>
            </div>
        </div>
    </FormLabel>
</template>
