<template>
  <header class="flex items-center justify-between pb-1">
    <slot></slot>
  </header>
</template>

<style lang="postcss" scoped>
header {
  @apply border-b border-gray-300  dark:border-gray-700;
}
</style>
