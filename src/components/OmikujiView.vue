<template>
  <div class="omikuji">
    <h1 class="title">伊予神社<br/>御神籤処</h1>

    <div class="legend">
      <label for="name">貴方のお名前は?</label><br/>
      <input class="name" id="name" type="text" v-model="state.name">
    </div>

    <copy-field :state="state" />

    <button class="update" v-on:click="update">引き直す</button>

    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, watch } from 'vue'
import { choice } from '@/lib/Omikuji'

import CopyField from '@/components/CopyField.vue'
import Footer from '@/components/Footer.vue'

export default defineComponent({
  name: 'OmikujiView',

  components: {
    CopyField,
    Footer
  },

  setup () {
    const state = reactive({
      result: choice(),
      name: 'こいつ'
    })

    const update = () => {
      state.result = choice()
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
.omikuji {
  max-width: 500px;

  margin: 0 auto;
  padding: 0 3rem;
}

.title {
  font-weight: normal;
  font-size: 4rem;

  line-height: 1;

  margin: 0;
  margin-bottom: 2rem;
  border-top: 3px solid;
  border-bottom: 3px solid;
  padding: 1rem 5rem;

  white-space: pre;
}

button, input {
  font-size: 1.2rem;
  padding: .5rem;

  border: 2px solid #d3d4dd;
  background: transparent;
}

button {
  border-radius: 5px;
}

.name {
  margin-top: .5rem;
  text-align: center;
}

.update:hover {
  background: #f6f6f6;
}
</style>
