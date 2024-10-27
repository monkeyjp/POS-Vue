<script setup>
import Link from "@/components/Link.vue";
import useImage from "@/composables/useImage";

const { onFileChange, isImageUploaded, url } = useImage();
</script>

<template>
  <div>
    <Link to="products"> Go Back </Link>
    <h1 class="text-4xl font-black my-10">New Product</h1>
    <div class="flex justify-center bg-white shadow">
      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit type="form" submit-label="Add Product">
          <FormKit
            type="text"
            label="Name"
            name="name"
            placeholder="Product Name"
            validation="required"
          />
          <FormKit
            type="file"
            label="Product Image"
            name="image"
            validation="required"
            accept=".jpg"
            @change="onFileChange"
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
          />
          <FormKit
            type="number"
            label="Price"
            name="price"
            validation="required"
            placeholder="Product Price"
            min="1"
          />
          <FormKit
            type="number"
            label="Availability"
            name="availability"
            validation="required"
            placeholder="Product Availability"
            min="1"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
