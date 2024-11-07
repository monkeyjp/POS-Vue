import { computed } from "vue";
import { defineStore } from "pinia";
import { useFirestore, useCollection } from "vuefire";
import { collection, addDoc, where, query, limit, orderBy } from "firebase/firestore";

export const useProductsStore = defineStore("products", () => {

    const db = useFirestore()

    const categories = [
        {
            id: 1,
            name: "Sweater"
        },
        {
            id: 2,
            name: "Shoes"
        },
        {
            id: 3,
            name: "Glasses"
        }
    ]
    const q = query(
        collection(db, "products"),
        orderBy("availability", "asc")
    )
    const productsCollection = useCollection(q)

    async function createProduct(product) {
        await addDoc(collection(db, "products"), product)
    }

    const categoryOptions = computed(() => {
        const options = [
            { label: "Select One", value: "", attrs: { disabled: true } },
            ...categories.map(category => (
                { label: category.name, value: category.id }
            ))
        ]
        return options
    })

    const noResults = computed(() => productsCollection.value.length === 0)

    return {
        createProduct, categoryOptions, productsCollection, noResults
    }
})