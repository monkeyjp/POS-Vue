import { defineStore } from "pinia";
import { ref, computed, watchEffect } from "vue";
import { useCouponStore } from "./coupons";
import { collection, addDoc, runTransaction, doc } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { getCurrentDate } from "@/helpers";

export const useCartStore = defineStore("cart", () => {

    const coupon = useCouponStore()
    const db = useFirestore()
    const items = ref([])
    const subtotal = ref(0)
    const iva = ref(0)
    const total = ref(0)


    const MAX_PRODUCTS = 5
    const IVA_RATE = .23


    watchEffect(() => {
        subtotal.value = items.value.reduce((total, item) => total + (item.quantity * item.price), 0)
        iva.value = Number((subtotal.value * IVA_RATE).toFixed(2))
        total.value = Number(((subtotal.value + iva.value) - coupon.discount).toFixed(2))

    })

    function addItem(item) {
        const index = isItemInCart(item.id)
        if (index >= 0) {
            if (isProductAvailable(item, index)) {
                alert("You have reached the maximum allowable quantity for this item.")
                return
            }
            items.value[index].quantity++
        } else {
            items.value.push({ ...item, quantity: 1, id: item.id })
        }

    }

    function updateQuantity(id, quantity) {
        items.value = items.value.map(item => item.id === id ? { ...item, quantity } : item)

    }

    function removeItem(id) {
        items.value = items.value.filter(item => item.id !== id)

    }

    async function checkout() {
        try {
            await addDoc(collection(db, 'sales'), {
                items: items.value.map(item => {
                    const { availability, category, ...data } = item
                    return data
                }),
                subtotal: subtotal.value,
                iva: iva.value,
                discount: coupon.discount,
                total: total.value,
                date: getCurrentDate()
            })
            //subtract 
            items.value.forEach(async (item) => {
                const productRef = doc(db, 'products', item.id)
                await runTransaction(db, async (transaction) => {
                    const currentProduct = await transaction.get(productRef)
                    const availability = currentProduct.data().availability - item.quantity
                    transaction.update(productRef, { availability })
                })
            })



            //reset
            $reset()
            coupon.$reset()
        } catch (error) {
            console.log(error);

        }

    }

    function $reset() {
        items.value = []
        subtotal.value = 0
        iva.value = 0
        total.value = 0
    }

    const isItemInCart = id => items.value.findIndex(item => item.id === id)
    const isProductAvailable = (item, index) => {
        return items.value[index].quantity >= item.availability || items.value[index].quantity >= MAX_PRODUCTS
    }

    const isEmpty = computed(() => items.value.length === 0)

    const checkProductAvailability = computed(() => {
        return (product) => product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS
    })

    return {
        addItem, isEmpty, items, checkProductAvailability, updateQuantity, subtotal, iva, total, removeItem, checkout
    }
})