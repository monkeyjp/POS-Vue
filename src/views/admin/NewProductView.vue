<script setup>
import { reactive } from "vue";
import Link from "@/components/Link.vue";
import useImage from "@/composables/useImage";
import { useProductsStore } from "@/stores/products";

const { onFileChange, isImageUploaded, url } = useImage();
const products = useProductsStore();

const formData = reactive({
  name: "",
  category: "",
  price: "",
  availability: "",
  image: "",
});

const submitHandler = (data) => {
  console.log(data);
};
</script>

<template>
  <div>
    <Link to="products"> Go Back </Link>
    <h1 class="text-4xl font-black my-10">New Product</h1>
    <div class="flex justify-center bg-white shadow">
      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit type="form" submit-label="Add Product" @submit="submitHandler">
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Product Name"
            validation="required"
            v-model.trim="formData.name"
          />
          <FormKit
            type="file"
            label="Product Image"
            name="image"
            validation="required"
            accept=".jpg"
            @change="onFileChange"
            v-model.trim="formData.image"
          />
          <div v-if="isImageUploaded">
            <p class="font-black">Product Image:</p>
            <img :src="url" alt="new product image" class="w-32" />
          </div>
          <FormKit
            type="select"
            label="Category"
            name="category"
            validation="required"
            :options="[1, 2, 3]"
            v-model.number="formData.category"
          />
          <FormKit
            type="number"
            label="Price"
            name="price"
            validation="required"
            placeholder="Product Price"
            min="1"
            v-model.number="formData.price"
          />
          <FormKit
            type="number"
            label="Availability"
            name="availability"
            validation="required"
            placeholder="Product Availability"
            min="1"
            v-model.number="formData.availability"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
