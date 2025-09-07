<template>
  <div>
    <Gallery 
      :products="productStore.filteredProducts"
      empty-state-title="Добро пожаловать в Gallery Shop!"
      empty-state-message="Выберите категорию товаров выше"
    />
  </div>
</template>

<script setup lang="ts">
const productStore = useProductStore()
</script>