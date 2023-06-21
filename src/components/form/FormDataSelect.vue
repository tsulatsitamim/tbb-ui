<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from 'vue'
import FormLabel from './FormLabel.vue'

const props = withDefaults(defineProps<{
    label?: string
    placeholder?: string
    modelValue?: string | number | any[]
    items?: any[]
    multiple?: boolean
    disabled?: boolean | number | string
    error?: string
}>(), {
    label: '',
    placeholder: '',
    error: '',
    multiple: false,
    items() {
        return []
    },
    disabled: false
})
const emit = defineEmits(['update:modelValue'])

const id = `fds-${Math.floor(Math.random() * 1000) + 1}`
const query = ref('')
const input = ref(null)
const container = ref(null)
const selector = ref(null)
const popup = ref(false)

const selectedItems: Ref<any[]> = ref([])
const displayedItems = computed(() => {
    const ids = selectedItems.value.map((x) => x.id)
    return props.items
        .filter((x) => (x.name || '').toLowerCase().includes(query.value.toLowerCase()))
        .map((x) => ({
            ...x,
            selected: ids.includes(x.id),
        }))
})

const selectItem = (item: any) => {
    query.value = ''

    if (props.multiple) {
        selectedItems.value.push(item)
        emit(
            'update:modelValue',
            selectedItems.value.map((x) => x.id)
        )
    } else {
        selectedItems.value = [item]
        emit(
            'update:modelValue',
            item.id
        )
        popup.value = false
    }
}

const removeItem = (i: any) => {
    query.value = ''
    setTimeout(() => {
        selectedItems.value.splice(i, 1)
        emit(
            'update:modelValue',
            selectedItems.value.map((x) => x.id)
        )
    }, 50)
}

const updateSelectedItems = () => {
    if (props.multiple) {
        selectedItems.value = props.items.filter((x) => (props.modelValue as any[]).includes(x.id))
    } else {
        const item = props.items.find(x => x.id === props.modelValue)
        selectedItems.value = item ? [item] : []
    }

}

watch(
    () => props.items,
    () => {
        updateSelectedItems()
    }
)

watch(
    () => props.modelValue,
    () => {
        updateSelectedItems()
    }
)

onMounted(() => {
    if (props.modelValue) {
        updateSelectedItems()
    }
    window.addEventListener('click', (e: any) => {
        if (!e.target.closest(`#${id}`)) {
            popup.value = false
        }
    })
})
</script>

<template>
    <FormLabel :label="label">
        <div :id="id">
            <div ref="container"
                class="appearance-none border border-gray-300 rounded-md focus:outline-none block w-full pl-3 pr-6 py-2 text-slate-700 relative"
                :class="[error && 'text-red-500 border-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500', disabled ? 'bg-slate-100' : 'bg-white']">
                <div class="absolute inset-0" @click="popup = true">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                        class="h-4 absolute right-1 top-1/2 transform -translate-y-1/2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                    </svg>
                </div>

                <div v-if="!multiple" :class="[!selectedItems[0] && 'text-gray-400', error && 'text-red-500']">
                    {{ selectedItems[0] ? selectedItems[0].name : (placeholder || `Pilih ${label || 'Item'}`) }}
                </div>
                <!-- 
                <ul v-else class="flex flex-wrap items-center">
                    <li v-for="(item, i) in selectedItems" :key="item.id" class="gap-1" @click="removeItem(i)">
                        <span
                            class="text-xs bg-gray-200 text-gray-800 inline-flex items-center px-2.5 py-1 rounded mr-2 cursor-pointer">
                            {{ item.name }}
                            <svg class="h-4 w-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                                </path>
                            </svg>
                        </span>
                    </li>
                    <li class="flex-grow">
                        <input type="text" class="outline-none w-full" disabled
                            :placeholder="selectedItems.length ? '' : placeholder || `Pilih ${label || 'Item'}`"
                            @click="popup = true" />
                    </li>
                </ul> -->
            </div>
            <div v-if="popup && !disabled" ref="selector" class="relative">
                <div class="w-full absolute bg-white top-0  z-10 border border-gray-300 text-gray-900 shadow-md">
                    <div class="p-1">
                        <input ref="input" v-model="query" type="text"
                            class="p-2 shadow-md border rounded focus:outline-none ring-blue-500 border-blue-500 w-full"
                            :placeholder="selectedItems.length ? '' : placeholder || `Pencarian ${label || 'Item'}`" />
                    </div>
                    <div class="max-h-48 overflow-y-scroll relative">
                        <ul>
                            <li v-for="item in displayedItems" :key="item.id"
                                class="py-2 px-5 cursor-pointer hover:bg-indigo-500 hover:text-white"
                                :class="[item.selected && 'bg-slate-200']" @click="
                                    item.selected
                                        ? removeItem(selectedItems.findIndex((x) => x.id === item.id))
                                        : selectItem(item)
                                    ">
                                {{ item.name }}
                            </li>
                            <li v-if="!displayedItems.length"
                                class="py-2 px-5 cursor-pointer text-xs text-center text-gray-400">
                                No results found
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <p v-if="error" class="mt-2 text-xs text-red-600 dark:text-red-500">
            {{ error }}
        </p>
    </FormLabel>
</template>
