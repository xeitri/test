import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([
    { id: 'all', name: 'Все', count: 0 },
    { id: 'electronics', name: 'Электроника', count: 15 },
    { id: 'clothing', name: 'Одежда', count: 23 },
    { id: 'books', name: 'Книги', count: 8 },
    { id: 'home', name: 'Для дома', count: 12 },
    { id: 'sports', name: 'Спорт', count: 7 },
    { id: 'beauty', name: 'Красота', count: 19 },
    { id: 'toys', name: 'Игрушки', count: 11 },
  ])
  
  const activeCategory = ref('all')
  const isExpanded = ref(false)
  
  const setActiveCategory = (categoryId: string) => {
    activeCategory.value = categoryId
  }
  
  const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value
  }
  
  const setExpanded = (expanded: boolean) => {
    isExpanded.value = expanded
  }
  
  return {
    categories: readonly(categories),
    activeCategory: readonly(activeCategory),
    isExpanded: readonly(isExpanded),
    setActiveCategory,
    toggleExpanded,
    setExpanded
  }
})