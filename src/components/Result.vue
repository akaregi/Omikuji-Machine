<template>
  <div class="result-page" v-on:click="onCopy">
    <p class="copy">
      <span>{{ state.name }}の今日の運勢は</span>
      <span class="result">{{ state.result }}</span>
      <span>であります</span>
      <span class="tag">#今日の御神籤 #御神籤</span>
    </p>
    <p class="footnote">※ 枠内をクリックでコピーできます</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type State = {
  name: string;
  result: string;
  count: number;
}

export default defineComponent({
  name: 'Result',

  props: {
    state: Object as PropType<State>
  },

  setup (props) {
    const onCopy = () => {
      const state = props.state

      const reset = state?.count
        ? state.count > 2
          ? `\n（引き直し${state.count}回）\n`
          : '\n'
        : '\n'

      navigator.clipboard.writeText(
        `${state?.name}の今日の運勢は **${state?.result}** であります` +
        reset +
        '#今日の御神籤 #御神籤\n' +
        'https://omikuji.fedyya.net'
      )
    }

    return { onCopy }
  }
})
</script>

<style scoped>
.result-page {
  margin: 2rem 0;
}

.copy {
  display: flex;
  flex-direction: column;

  margin: 0;
  border: 3px solid #efefef;
  padding: 2rem;

  cursor: pointer;
  user-select: none;

  transition: background-color;
  transition-timing-function: cubic-bezier(0.07, 0.91, 0.24, 1);
  transition-duration: 1s;
}

.copy:active {
  background: #ddf8dc;
}

.result {
  font-size: 3rem;
  font-weight: bold;

  line-height: 1.2;

  margin: .5rem 0;
}

.tag {
  color: #502fd4;
}

.footnote {
  margin: 0;
}
</style>
