import { defineStore } from "pinia";
import { ref, computed } from "vue";


export const useCartStore = defineStore("cart", () => {

    const items = ref([])

    function addItem(item) {
        items.value.push(item)

    }

    const isEmpty = computed(() => items.value.length === 0)
    return {
        addItem, isEmpty, items
    }
})