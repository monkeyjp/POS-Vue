<script setup>
import VueTailwindDatePicker from "vue-tailwind-datepicker";
import { ref } from "vue";
import { useSalesStore } from "@/stores/sales";
import SaleDetails from "@/components/SaleDetails.vue";
import { formatCurrency } from "@/helpers";

const sales = useSalesStore();

const formatter = ref({
  date: "DD/MM/YYYY",
  month: "MMMM",
});
</script>

<template>
  <h1 class="text-4xl font-black my-10">Sales Summary</h1>
  <div class="md:flex md:items-start gap-5">
    <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center p-5">
      <VueTailwindDatePicker
        v-model="sales.date"
        as-single
        no-input
        :formatter="formatter"
      />
    </div>
    <div
      class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32"
    >
      <p class="text-center text-lg" v-if="sales.isDateSelected">
        Sales from date: <span class="font-black">{{ sales.date }}</span>
      </p>
      <p class="text-center text-lg" v-else>Select a date</p>
      <div v-if="sales.salesCollection.length" class="space-y-5">
        <p class="text-right text-2xl">
          Total sales of day:
          <span class="font-black">
            {{ formatCurrency(sales.totalSalesOfDay) }}
          </span>
        </p>
        <SaleDetails
          v-for="sale in sales.salesCollection"
          :key="sale.id"
          :sale="sale"
        />
      </div>
      <p v-else-if="sales.noSales" class="text-lg text-center">
        No sales for this day
      </p>
    </div>
  </div>
</template>
