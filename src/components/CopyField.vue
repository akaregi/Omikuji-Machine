<template>
  <div class="copy">
    <p id="copy-text">こいつの今日の運勢は **{{ result }}** であります<br/><span class="tag">#今日の御神籤 #御神籤</span></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

type Props = {
  result: string;
}

export default defineComponent({
  name: 'Copy',

  props: {
    result: {
      type: String,
      default: '無'
    }
  }
})
</script>

<style scoped>
.copy {
  margin: 2rem 0;
  border: 3px solid #efefef;

  font-size: 1.3rem;

  cursor: text;
  /* user-select: none; */
}

.tag {
  color: #502fd4;
}
</style>
