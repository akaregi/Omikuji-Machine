<template>
  <footer class="footer">
    <p>
      (C) 2020 Mizuho SHINOHARA.
      <a
        href="https://github.com/akaregi/Omikuji-Machine"
      >Check the source!</a>
    </p>
    <p>
      This is licensed under
      <a
        href="https://www.gnu.org/licenses/agpl-3.0.en.html"
      >GNU Affero General Public License version 3</a>.
    </p>
  </footer>
</template>

<style lang="postcss" scoped>
.footer {
  @apply my-8;
  @apply text-lg text-gray-500;
  & a {
    @apply text-indigo-500;
    &:hover {
      @apply text-indigo-800;
    }
  }
}
</style>