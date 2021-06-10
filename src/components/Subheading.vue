<template>
  <header>
    <slot></slot>
  </header>
</template>

<style lang="postcss" scoped>
header {
  @apply flex items-center justify-between pb-1;
  @apply border-b border-gray-300  dark:border-gray-700;
}
</style>
