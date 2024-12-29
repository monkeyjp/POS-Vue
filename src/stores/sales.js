import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSalesStore = defineStore('sales', () => {

    const date = ref("");
    const isDateSelected = computed(() => date.value)
    return {
        date, isDateSelected
    }
})