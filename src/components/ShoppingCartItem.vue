<script setup>
import { formatCurrency } from "@/helpers";
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <li class="flex space-x-6 py-6">
    <img
      :src="item.image"
      :alt="'image of ' + item.name"
      class="h-24 w-24 flex-none rouded-md"
    />
    <div class="flex-auto space-y-2">
      <h3 class="text-gray-900">
        {{ item.name }}
      </h3>
      <p>{{ formatCurrency(item.price) }}</p>
    </div>
  </li>
</template>
