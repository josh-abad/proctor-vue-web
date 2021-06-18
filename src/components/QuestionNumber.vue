<template>
  <div class="bg-gray-300 dark:bg-gray-700">
    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped>
div {
  @apply flex items-center justify-center w-6 h-6 text-sm rounded;
}
</style>
