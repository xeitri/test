<template>
  <div 
    class="bg-gray-900 border-b border-gray-800 transition-all duration-300 overflow-hidden"
    :class="{ 'max-h-20': !isExpanded, 'max-h-96': isExpanded }"
  >
    <!-- Collapsed State - Horizontal Scroll -->
    <div 
      v-show="!isExpanded"
      class="flex overflow-x-auto py-4 px-4 space-x-3"
      style="-ms-overflow-style: none; scrollbar-width: none;"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
    >
      <button
        v-for="category in categories"
        :key="category.id"
        @click="setActiveCategory(category.id)"
        class="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors duration-200"
        :class="activeCategory === category.id ? 'bg-white text-black' : 'bg-gray-800 text-white hover:bg-gray-700'"
      >
        {{ category.name }}
        <span v-if="category.count > 0" class="ml-1 opacity-60">
          ({{ category.count }})
        </span>
      </button>
    </div>
    
    <!-- Expanded State - Grid -->
    <Transition
      enter-active-class="transition-all duration-300"
      enter-from-class="opacity-0 transform translate-y-4"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition-all duration-300"  
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform translate-y-4"
    >
      <div 
        v-show="isExpanded"
        class="p-4"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
      >
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="setActiveCategory(category.id)"
            class="text-center py-3 px-4 rounded-xl text-sm font-medium transition-colors duration-200"
            :class="activeCategory === category.id ? 'bg-white text-black' : 'bg-gray-800 text-white hover:bg-gray-700'"
          >
            <div>{{ category.name }}</div>
            <div v-if="category.count > 0" class="text-xs opacity-60 mt-1">
              {{ category.count }} товаров
            </div>
          </button>
        </div>
      </div>
    </Transition>
    
    <!-- Expand/Collapse Indicator -->
    <div class="flex justify-center pb-2">
      <div 
        class="w-8 h-1 bg-gray-600 rounded-full cursor-pointer transition-transform duration-200"
        :class="{ 'rotate-180': isExpanded }"
        @click="toggleExpanded"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const categoryStore = useCategoryStore()
const { categories, activeCategory, isExpanded } = storeToRefs(categoryStore)
const { setActiveCategory, toggleExpanded, setExpanded } = categoryStore

// Touch handlers for swipe gestures
let startY = 0
let startTime = 0

const handleTouchStart = (e: TouchEvent) => {
  startY = e.touches[0].clientY
  startTime = Date.now()
}

const handleTouchMove = (e: TouchEvent) => {
  const currentY = e.touches[0].clientY
  const deltaY = currentY - startY
  const deltaTime = Date.now() - startTime
  
  // Swipe down to expand (and currently collapsed)
  if (deltaY > 50 && deltaTime < 300 && !isExpanded.value) {
    setExpanded(true)
  }
  // Swipe up to collapse (and currently expanded)
  else if (deltaY < -50 && deltaTime < 300 && isExpanded.value) {
    setExpanded(false)
  }
}
</script>

<style scoped>
div::-webkit-scrollbar {
  display: none;
}
</style>