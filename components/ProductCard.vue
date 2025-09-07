<template>
  <div class="relative bg-gray-800 rounded-lg overflow-hidden group">
    <!-- Product Image -->
    <div class="aspect-square relative overflow-hidden">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
        @click="showModal = true"
      />
      
      <!-- Favorite Button -->
      <button
        @click="handleFavoriteClick"
        class="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10"
        :class="[
          isFavorite ? 'bg-yellow-500 text-black' : 'bg-black/50 text-white hover:bg-black/70',
          { 'animate-bounce': animateFavorite }
        ]"
      >
        <span class="text-lg">{{ isFavorite ? '⭐' : '☆' }}</span>
      </button>
      
      <!-- Price Overlay -->
      <div class="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
        {{ formatPrice(product.price) }} ₽
      </div>
    </div>
    
    <!-- Product Info -->
    <div class="p-3">
      <h3 class="text-white font-medium text-sm mb-2 line-clamp-2">
        {{ product.name }}
      </h3>
      
      <!-- Buy Button -->
      <a
        v-if="product.telegramUrl"
        :href="product.telegramUrl"
        target="_blank"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors duration-200 flex items-center justify-center"
      >
        Купить в Telegram
      </a>
    </div>
    
    <!-- Modal for enlarged image -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
        @click="showModal = false"
      >
        <div class="relative max-w-lg w-full">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full rounded-lg"
          />
          <button
            @click="showModal = false"
            class="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70"
          >
            ✕
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/stores/product'

interface Props {
  product: Product
}

const props = defineProps<Props>()

const favoriteStore = useFavoriteStore()
const showModal = ref(false)
const animateFavorite = ref(false)

const isFavorite = computed(() => favoriteStore.isFavorite(props.product.id))

const handleFavoriteClick = () => {
  favoriteStore.toggleFavorite(props.product.id)
  
  // Animate the favorite button
  animateFavorite.value = true
  setTimeout(() => {
    animateFavorite.value = false
  }, 500)
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('ru-RU').format(price)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>