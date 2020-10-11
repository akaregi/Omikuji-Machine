<template>
  <div class="omikuji">
    <h1 class="title">伊予神社・御神籤処</h1>

    <div class="result">
      <p>{{ state.result }}</p>
    </div>

    <div class="copy">
      <p>こいつの今日の運勢は **{{ state.result }}** であります<br/><span class="tag">#今日の御神籤 #御神籤</span></p>
    </div>

    <button class="button" v-on:click="update">やり直してみる</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { choice } from '@/lib/Omikuji'

export default defineComponent({
  name: 'OmikujiView',

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

.result {
  margin: 2rem 0;
  padding: 1rem;

  font-size: 30px;
  font-weight: bold;
}

.copy {
  margin: 2rem 0;
  border: 3px solid #efefef;

  font-size: 1.3rem;
}

.tag {
  color: #502fd4;
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
