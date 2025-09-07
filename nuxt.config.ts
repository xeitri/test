export default defineNuxtConfig({
  // Убираем pages: false чтобы включить файловую маршрутизацию
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  // Убираем css пока что, так как @nuxtjs/tailwindcss должен автоматически подключать
  app: {
    head: {
      title: 'Gallery Shop',
      meta: [
        { name: 'description', content: 'Магазин с галереей товаров' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
})