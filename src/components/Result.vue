<template>
  <div class="result">
    {{ result }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type Props = {
  result: string;
}

export default defineComponent({
  name: 'Result',

  props: {
    result: {
      type: String,
      default: '無'
    }
  }
})
</script>

<style scoped>
.result {
  margin: 2rem 0;
  padding: 1rem;

  font-size: 30px;
  font-weight: bold;
}
</style>
