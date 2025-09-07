<template>
  <div>
    <div class="p-4 border-b border-gray-800">
      <h1 class="text-2xl font-bold text-white">Избранное</h1>
      <p class="text-gray-400 text-sm mt-1">{{ favoriteStore.favoriteIds.length }} товаров</p>
    </div>
    
    <Gallery 
      :products="favoriteStore.favoriteProducts"
      empty-state-title="Избранное пусто"
      empty-state-message="Добавьте товары в избранное, нажав на звездочку"
    />
  </div>
</template>

<script setup lang="ts">
const favoriteStore = useFavoriteStore()
</script>