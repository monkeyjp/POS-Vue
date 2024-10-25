<script setup>
import { RouterLink } from "vue-router";
import Link from "./Link.vue";
import Logo from "./Logo.vue";
</script>

<template>
  <header
    class="px-10 py-5 bg-gray-700 flex justify-between absolute top-0 w-full z-10"
  >
    <div>
      <Logo />
    </div>
    <nav>
      <RouterLink
        :to="{ name: 'products' }"
        class="rounded text-white font-bold p-2"
      >
        Products
      </RouterLink>
      <RouterLink
        :to="{ name: 'sales' }"
        class="rounded text-white font-bold p-2"
      >
        Sales
      </RouterLink>
      <Link to="shop"> Go To Store </Link>
    </nav>
  </header>
</template>
