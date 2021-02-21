<template>
  <div class="center">
    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped>
.center {
  @apply flex justify-center items-center;
  min-height: 95vh;
}
</style>
