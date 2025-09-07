import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', () => {
  const activeCategory = ref('all')
  const isExpanded = ref(false)
  
  // Вычисляем категории динамически на основе продуктов
  const categories = computed(() => {
    const { $pinia } = useNuxtApp()
    const productStore = $pinia ? useProductStore($pinia) : null
    
    if (!productStore) {
      return [
        { id: 'all', name: 'Все', count: 0 }
      ]
    }
    
    const products = productStore.products
    const categoryMap = new Map()
    
    // Подсчитываем товары по категориям
    products.forEach(product => {
      const current = categoryMap.get(product.category) || 0
      categoryMap.set(product.category, current + 1)
    })
    
    const staticCategories = [
      { id: 'all', name: 'Все', count: products.length },
      { id: 'electronics', name: 'Электроника', count: categoryMap.get('electronics') || 0 },
      { id: 'clothing', name: 'Одежда', count: categoryMap.get('clothing') || 0 },
      { id: 'books', name: 'Книги', count: categoryMap.get('books') || 0 },
      { id: 'home', name: 'Для дома', count: categoryMap.get('home') || 0 },
      { id: 'sports', name: 'Спорт', count: categoryMap.get('sports') || 0 },
      { id: 'beauty', name: 'Красота', count: categoryMap.get('beauty') || 0 },
      { id: 'toys', name: 'Игрушки', count: categoryMap.get('toys') || 0 },
    ]
    
    // Показываем только категории с товарами (кроме "Все")
    return staticCategories.filter(cat => cat.id === 'all' || cat.count > 0)
  })
  
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
    categories,
    activeCategory: readonly(activeCategory),
    isExpanded: readonly(isExpanded),
    setActiveCategory,
    toggleExpanded,
    setExpanded
  }
})