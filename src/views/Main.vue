<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { omikujiResultDB } from '../database/omikujiResultDB'
import { preferenceDB } from '../database/preferenceDB'
import { Preference } from '../database/schema'
import { lottery } from '../lib/omikuji'

const result = ref('Please wait...')
const count = ref(0)

// Initializes preference
const state = reactive({
  name: 'あんた',
  useCommon: false,
  useMarkdown: false,
  showCount: false
})

// Loads preferences from the database and merge them into state
onMounted(async () => {
  // NOTE: Dexies.js will NOT work in the phase of setup
  const preferences = await preferenceDB.get({ id: 1 })

  if (preferences) {
    const persist: Omit<Preference, 'id'> = preferences
    Object.assign(state, persist)
  }

  const initialResult = lottery(state.useCommon)
  result.value = initialResult

  // Writes the lottery result on loading
  await omikujiResultDB.add({
    name: state.name,
    date: Date.now(),
    result: initialResult
  })
})

watch(() => state, async (state) => {
  await preferenceDB.put({ ...state })
}, { deep: true })

const update = async () => {
  result.value = lottery(state.useCommon)
  count.value++

  const id = await omikujiResultDB.add({
    name: state.name,
    date: Date.now(),
    result: result.value
  })

  console.log(`Attempt #${id} was written to the database.`)
}

const onCopy = () => {
  const resetText = state.showCount && count.value >= 1
    ? `（引き直し${count.value}回）\n`
    : '\n'

  const lotteryText = state.useMarkdown
    ? `**${result.value}**`
    : result.value

  navigator.clipboard.writeText(
    `${state.name}の今日の運勢は ${lotteryText} であります` +
    resetText +
    '#伊予みくじ #御神籤処\n' +
    'https://omikuji.azure.icu'
  )
}
</script>

<template>
  <main class="omikuji">
    <div class="legend">
      <input
        id="name"
        v-model="state.name"
        type="text"
        title="Your name"
        class="name"
      >
      <button
        class="update"
        @click="update"
      >
        引いてみる
      </button>
    </div>
  </main>

  <div
    class="result"
    @click="onCopy"
  >
    <p class="copy">
      <span>{{ state.name }}の今日の運勢は</span>
      <span class="wow">{{ result }}</span>
      <span>であります</span>
      <span class="tag">#伊予みくじ #御神籤処</span>
    </p>
    <p class="footnote">
      ※ 枠内をタップするとコピーできます
    </p>
  </div>

  <details class="config">
    <summary>詳細設定（保存されます）</summary>
    <input
      id="traditional"
      v-model="state.useCommon"
      type="checkbox"
      title="Use traditional only?"
    >
    <label for="traditional">普通の御神籤だけを引くようにする</label>
    <br>
    <input
      id="markdown"
      v-model="state.useMarkdown"
      type="checkbox"
      title="Use markdown?"
    >
    <label for="markdown">Markdown を有効にする（コピーに影響します）</label>
    <br>
    <input
      id="showCount"
      v-model="state.showCount"
      type="checkbox"
      title="Show count?"
    >
    <label for="showCount">引き直しの回数を表示する</label>
  </details>
</template>

<style lang="postcss" scoped>
.omikuji {
  @apply m-8 flex flex-col content-center;
}

.legend {
  @apply flex flex-wrap justify-center;
  & button,
  & input {
    @apply mx-4 my-1 p-2 px-4;
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
      @apply bg-green-600;
    }

    &:active {
      @apply bg-green-600;
    }
  }
}

.result {
  @apply m-8;
}

.copy {
  @apply my-4 p-4;
  @apply cursor-pointer select-none;
  @apply rounded-md shadow-xl bg-white;
  @apply transition duration-300 ease-in-out;
  @apply border border-gray-200;

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

.config {
  @apply text-xl;

  & label {
    @apply ml-1;
  }
}
</style>