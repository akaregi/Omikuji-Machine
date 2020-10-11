<template>
  <div class="omikuji">
    <h1 class="title">伊予神社・御神籤処</h1>

    <Result :result="state.result" />
    <copy-field :result="state.result" />

    <button class="button" v-on:click="update">やり直してみる</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { choice } from '@/lib/Omikuji'

import Result from '@/components/Result.vue'
import CopyField from '@/components/CopyField.vue'

export default defineComponent({
  name: 'OmikujiView',

  components: {
    Result,
    CopyField
  },

  setup () {
    const state = reactive({
      result: choice()
    })

    const update = () => {
      state.result = choice()
    }

    return { state, update }
  }
})
</script>

<style scoped>
.omikuji {
  max-width: 768px;
  margin: 0 auto;
}

.title {
  font-weight: normal;
  font-size: 4rem;

  margin: 3rem 0;
}

.button {
  font-size: 1.2rem;
  padding: .5rem;

  border: 2px solid #d3d4dd;
  background: transparent;
  border-radius: 3px;
}

.button:hover {
  background: #eeeeee;
}
</style>
