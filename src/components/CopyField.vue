<template>
  <div class="copy-field" v-on:click="onCopy">
    <div class="copy">
      <p id="copy-text">{{ state.name }}の今日の運勢は<wbr/><strong>{{ state.result }}</strong>であります<br/><span class="tag">#今日の御神籤 #御神籤</span></p>
    </div>
    <p class="footnote">※ 枠内をクリックでコピーできます</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

type State = {
  name: string;
  result: string;
}

export default defineComponent({
  name: 'Copy',

  props: {
    state: Object as PropType<State>
  },

  setup (props) {
    const onCopy = () => {
      const state = props.state
      navigator.clipboard.writeText(
        `${state?.name}の今日の運勢は **${state?.result}** であります` +
        '\n' +
        '#今日の御神籤 #御神籤'
      )
    }

    return { onCopy }
  }
})
</script>

<style scoped>
.copy-field {
  margin: 2rem 0;
}

.copy {
  border: 3px solid #efefef;
  padding: 1rem;

  cursor: pointer;
  user-select: none;

  white-space: pre;

  transition: background-color;
  transition-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
  transition-duration: 1s;
}

.copy:active {
  background: #e2dcf8;
}

.tag {
  color: #502fd4;
}

.footnote {
  margin: 0;
  margin-top: .5rem;
}
</style>
