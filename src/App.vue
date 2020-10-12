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

<style>
body {
  font-size: 24px;
  font-family:
    BlinkMacSystemFont,-apple-system,
    Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,
    Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,
    "Yu Gothic Medium",YuGothic,sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-feature-settings: "palt";

  color: #2c3e50;
  text-align: center;
  line-height: 1.47;

  padding-top: 4rem;
}
</style>
