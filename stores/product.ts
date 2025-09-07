import { defineStore } from 'pinia'

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  telegramUrl?: string
}

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([
    {
      id: '1',
      name: 'iPhone 15 Pro',
      price: 99999,
      image: 'https://picsum.photos/300/300?random=1',
      category: 'electronics',
      telegramUrl: 'https://t.me/your_bot?start=product_1'
    },
    {
      id: '2', 
      name: 'Кроссовки Nike',
      price: 8999,
      image: 'https://picsum.photos/300/300?random=2',
      category: 'clothing',
      telegramUrl: 'https://t.me/your_bot?start=product_2'
    },
    {
      id: '3',
      name: 'MacBook Air M2',
      price: 129999,
      image: 'https://picsum.photos/300/300?random=3', 
      category: 'electronics',
      telegramUrl: 'https://t.me/your_bot?start=product_3'
    },
    {
      id: '4',
      name: 'Книга "1984"',
      price: 599,
      image: 'https://picsum.photos/300/300?random=4',
      category: 'books',
      telegramUrl: 'https://t.me/your_bot?start=product_4'
    },
    {
      id: '5',
      name: 'Кофемашина',
      price: 15999,
      image: 'https://picsum.photos/300/300?random=5',
      category: 'home',
      telegramUrl: 'https://t.me/your_bot?start=product_5'
    },
    {
      id: '6',
      name: 'Футболка',
      price: 1299,
      image: 'https://picsum.photos/300/300?random=6',
      category: 'clothing',
      telegramUrl: 'https://t.me/your_bot?start=product_6'
    },
  ])
  
  const filteredProducts = computed(() => {
    const categoryStore = useCategoryStore()
    if (categoryStore.activeCategory === 'all') {
      return products.value
    }
    return products.value.filter(product => product.category === categoryStore.activeCategory)
  })
  
  return {
    products: readonly(products),
    filteredProducts
  }
})