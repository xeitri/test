<template>
  <div class="p-4">
    <div 
      v-if="products.length > 0"
      class="grid grid-cols-2 gap-3"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    
    <!-- Empty State -->
    <div 
      v-else
      class="flex flex-col items-center justify-center py-20 text-gray-500"
    >
      <div class="text-6xl mb-4">📦</div>
      <h3 class="text-lg font-medium mb-2">{{ emptyStateTitle }}</h3>
      <p class="text-sm text-center">{{ emptyStateMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/stores/product'

interface Props {
  products: Product[]
  emptyStateTitle?: string
  emptyStateMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  emptyStateTitle: 'Товары не найдены',
  emptyStateMessage: 'Попробуйте изменить фильтр или выбрать другую категорию'
})
</script>