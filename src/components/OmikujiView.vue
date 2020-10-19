<template>
  <main class="omikuji">
    <Header />

    <div class="legend">
      <input class="name" type="text" v-model="state.name">
      <button class="update" v-on:click="update">引き直す</button>
    </div>

    <Result :state="state" />

    <Footer />
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { choice } from '@/lib/Omikuji'

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Result from '@/components/Result.vue'

export default defineComponent({
  name: 'OmikujiView',

  components: {
    Header,
    Footer,
    Result
  },

  setup () {
    const state = reactive({
      result: choice(),
      name: 'こいつ',
      count: 0
    })

    const update = () => {
      state.result = choice()
      state.count += 1
    }

    onMounted(() => {
      if (localStorage.name) {
        state.name = localStorage.name
      }
    })

    watch(() => state.name, (newName) => {
      localStorage.name = newName
    })

    return { state, update }
  }
})
</script>

<style lang="postcss" scoped>
.omikuji {
  @apply m-8 flex flex-col content-center text-center;
}

.legend {
  @apply flex flex-wrap justify-center;

  & button, & input {
    @apply m-2 p-2 px-4;
    @apply outline-none;

    @apply transition duration-300 ease-in-out;
  }

  & input {
    @apply text-center rounded-md shadow;
    @apply border;

    &:focus {
      @apply border border-green-400;
    }
  }

  & button {
    @apply text-white bg-gray-600;
    @apply rounded-md shadow-lg;

    &:hover {
      @apply bg-red-500;
    }

    &:active {
      @apply bg-red-600;
    }
  }
}
</style>
