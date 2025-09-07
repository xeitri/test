<template>
  <div class="min-h-screen bg-black text-white">
    <!-- Category Bar -->
    <CategoryBar />
    
    <!-- Main Content -->
    <main class="pb-20"> <!-- Bottom padding for nav -->
      <NuxtPage />
    </main>
    
    <!-- Bottom Navigation -->
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
// Layout setup can include global logic if needed
</script>