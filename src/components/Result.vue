<template>
  <div class="result" v-on:click="onCopy">
    <p class="copy">
      <span>{{ state.name }}の今日の運勢は</span>
      <span class="wow"><strong>{{ state.result }}</strong></span>
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

      const reset = (state?.count ?? 0) >= 1
        ? `\n（引き直し${state?.count}回）\n`
        : '\n'

      navigator.clipboard.writeText(
        `${state?.name ?? 'こいつ'}の今日の運勢は **${state?.result ?? '無'}** であります` +
        reset +
        '#今日の御神籤 #御神籤\n' +
        'https://omikuji.fedyya.net'
      )
    }

    return { onCopy }
  }
})
</script>

<style lang="postcss" scoped>
.result {
  @apply my-8;
}

.copy {
  @apply my-4 p-4;
  @apply cursor-pointer select-none;
  @apply rounded-md shadow-xl bg-white;
  @apply transition duration-300 ease-in-out;

  &:active {
    @apply bg-green-200;
  }

  & .wow {
    @apply my-2;
    @apply leading-tight text-4xl;
  }

  & .tag {
    @apply text-indigo-500;
  }

  & span {
    @apply block;
  }
}
</style>
