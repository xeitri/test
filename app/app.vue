<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Global app setup
useHead({
  title: 'Gallery Shop',
  meta: [
    { name: 'description', content: 'Современный магазин с галереей товаров' }
  ]
})
</script>