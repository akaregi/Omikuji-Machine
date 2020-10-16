<template>
  <main class="omikuji">
    <Header />

    <input class="name" type="text" v-model="state.name">
    <button class="update" v-on:click="update">引き直す</button>

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

<style scoped>
button, input {
  padding: .5rem;
}

button {
  background: transparent;

  border: 3px solid #d15151;
  border-radius: 5px;
}

button:focus, input:focus {
  border: 3px solid black;
  outline: none;
}

input {
  display: inline-block;

  margin-right: 1rem;
  border: 3px solid #efefef;

  text-align: center;

}
</style>
