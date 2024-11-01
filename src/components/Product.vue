<script setup>
import { formatCurrency } from "@/helpers";
defineProps({
  product: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <li
    class="flex items-center space-x-6 border border-gray-200 p-6 bg-white shadow"
  >
    <img :src="product.image" :alt="product.name" class="h-24 w-24" />
    <div class="space-y-2">
      <h1 class="text-gray-900">{{ product.name }}</h1>
      <p class="font-extrabold">{{ formatCurrency(product.price) }}</p>
      <p>{{ product.availability }} in Stock</p>
    </div>
  </li>
</template>
