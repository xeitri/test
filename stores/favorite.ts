import { defineStore } from 'pinia'

export const useFavoriteStore = defineStore('favorite', () => {
  const favoriteIds = ref<string[]>([])
  const token = ref<string | null>(null)
  
  // Инициализация при загрузке
  const initialize = () => {
    if (process.client) {
      loadFromStorage()
      checkToken()
    }
  }
  
  const checkToken = () => {
    if (process.client) {
      const urlParams = new URLSearchParams(window.location.search)
      const urlToken = urlParams.get('token')
      
      if (urlToken) {
        token.value = urlToken
        localStorage.setItem('auth_token', urlToken)
      } else {
        token.value = localStorage.getItem('auth_token')
      }
    }
  }
  
  const loadFromStorage = () => {
    if (process.client) {
      const stored = localStorage.getItem('favorites')
      if (stored) {
        try {
          favoriteIds.value = JSON.parse(stored)
        } catch (e) {
          favoriteIds.value = []
        }
      }
    }
  }
  
  const saveToStorage = () => {
    if (process.client) {
      localStorage.setItem('favorites', JSON.stringify(favoriteIds.value))
    }
  }
  
  const addToFavorites = (productId: string) => {
    if (!favoriteIds.value.includes(productId)) {
      favoriteIds.value.push(productId)
      saveToStorage()
      // TODO: отправить на сервер с токеном
    }
  }
  
  const removeFromFavorites = (productId: string) => {
    const index = favoriteIds.value.indexOf(productId)
    if (index > -1) {
      favoriteIds.value.splice(index, 1)
      saveToStorage()
      // TODO: отправить на сервер с токеном
    }
  }
  
  const toggleFavorite = (productId: string) => {
    if (isFavorite(productId)) {
      removeFromFavorites(productId)
    } else {
      addToFavorites(productId)
    }
  }
  
  const isFavorite = (productId: string) => {
    return favoriteIds.value.includes(productId)
  }
  
  const favoriteProducts = computed(() => {
    const productStore = useProductStore()
    return productStore.products.filter(product => 
      favoriteIds.value.includes(product.id)
    )
  })
  
  // Автоинициализация
  if (process.client) {
    initialize()
  }
  
  return {
    favoriteIds: readonly(favoriteIds),
    token: readonly(token),
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    favoriteProducts,
    initialize
  }
})