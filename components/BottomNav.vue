<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-4 py-2 z-50">
    <div class="flex justify-around items-center max-w-md mx-auto">
      <NuxtLink 
        to="/"
        class="flex flex-col items-center justify-center text-xs transition-colors duration-200"
        :class="$route.path === '/' ? 'text-white' : 'text-gray-400 hover:text-white'"
      >
        <div class="text-xl mb-1">🏠</div>
        <span>Главная</span>
      </NuxtLink>
      
      <NuxtLink 
        to="/favorites"
        class="flex flex-col items-center justify-center text-xs transition-colors duration-200 relative"
        :class="$route.path === '/favorites' ? 'text-white' : 'text-gray-400 hover:text-white'"
      >
        <div class="text-xl mb-1 relative">
          ⭐
          <div 
            v-if="favoriteCount > 0"
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
          >
            {{ favoriteCount }}
          </div>
        </div>
        <span>Избранное</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const favoriteStore = useFavoriteStore()
const favoriteCount = computed(() => favoriteStore.favoriteIds.length)
</script>