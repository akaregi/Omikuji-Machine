<script setup lang="ts">
import Header from './components/GlobalHeader.vue'
import Footer from './components/GlobalFooter.vue'
import Main from './views/Main.vue'
</script>

<template>
  <Header />
  <Main />
  <Footer />
</template>

<style lang="postcss">
body {
  @apply text-2xl font-sans text-gray-800 subpixel-antialiased
    leading-normal tracking-tight;
  @apply max-w-screen-sm mr-auto ml-auto !important;
  @apply bg-gray-100;

  @apply text-center;
}
</style>