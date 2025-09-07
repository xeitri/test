export default defineNuxtConfig({
  pages: false,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
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