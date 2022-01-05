<template>
  <header class="header">
    <h1 class="title">
      <span>伊予神社</span>
      <span>御神籤処</span>
    </h1>
  </header>
</template>

<style lang="postcss" scoped>
.header {
  @apply my-8;
  
  & .title {
    @apply flex flex-wrap justify-center gap-x-4 gap-y-2;
    @apply leading-tight text-4xl;
    & span {
      @apply inline-block;
      @apply whitespace-pre;
    }
  }
}
</style>