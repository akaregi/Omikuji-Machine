<template>
  <omikuji-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OmikujiView from './components/OmikujiView.vue'

export default defineComponent({
  name: 'App',
  components: {
    OmikujiView
  }
})
</script>

<style lang="postcss">
body {
  @apply
    text-2xl font-sans text-gray-800
    antialiased subpixel-antialiased
    leading-normal tracking-tight;

  @apply max-w-screen-sm mr-auto ml-auto !important;
  @apply bg-gray-100;
}
</style>
