<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { omikujiResultDB } from '../database/omikujiResultDB'
import { preferenceDB } from '../database/preferenceDB'
import { Preference } from '../database/schema'
import { constants } from '../config/constant'
import { lottery } from '../lib/omikuji'

const result = ref('Please wait...')
const clipboard = ref('')
const count = ref(0)

// Initializes preference
const state = reactive({
  name: 'あんた',
  useCommon: false,
  useMarkdown: false,
  showCount: false
})

const generateResultText = (): string => {
  const lotteryText = state.useMarkdown
    ? `**${result.value}**`
    : result.value

  const resetText = state.showCount && count.value >= 1
    ? `（引き直し${count.value}回）\n`
    : '\n'

  const text =
    `${state.name}の今日の運勢は ${lotteryText} であります` +
    resetText +
    `${constants.getHashtags()}`

  return text
}

// Loads preferences from the database and merge them into state
onMounted(async () => {
  // NOTE: Dexies.js will NOT work in the phase of setup
  const preferences = await preferenceDB.get({ id: 1 })

  if (preferences) {
    Object.assign(state, preferences as Omit<Preference, 'id'>)
  }

  result.value = lottery(state.useCommon)

  // Writes the lottery result on loading
  await omikujiResultDB.add({
    name: state.name,
    date: Date.now(),
    result: result.value
  })

  clipboard.value = generateResultText()
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
  clipboard.value = generateResultText() + `\n${constants.address}`
  navigator.clipboard.writeText(clipboard.value)
}
</script>

<template>
  <main class="omikuji">
    <section class="form">
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
        引く
      </button>
    </section>

    <section
      class="result"
      @click="onCopy"
    >
      <p class="copy">
        <span>{{ state.name }}の今日の運勢は</span>
        <span class="wow">{{ result }}</span>
        <span>であります</span>
        <span class="tag">{{ constants.getHashtags() }}</span>
      </p>
      <section class="footnote">
        <p>※ 枠内をタップするとコピーできます</p>
        <div class="twitter">
          <a
            href="https://twitter.com/share"
            class="twitter-share-button"
            data-lang="ja"
            :data-text="clipboard"
          >ツイート</a>
        </div>
      </section>
    </section>

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
  </main>
</template>

<style lang="postcss" scoped>
.omikuji {
  @apply m-4 flex flex-col content-center gap-4;
}

.form {
  @apply flex flex-wrap justify-center gap-4;
  & button,
  & input {
    @apply p-2 px-4;
    @apply outline-none;
    @apply transition duration-300 ease-in-out;
    @apply flex-1;
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
  & .footnote {
    @apply text-xl mt-4;
  }
}

.copy {
  @apply p-4 mb-2;
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