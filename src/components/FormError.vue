<template>
  <div class="form-error form-error--border">
    <ExclamationIcon class="form-error__icon" />
    <div class="form-error__message"><slot /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ExclamationIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'FormError',
  components: { ExclamationIcon }
})
</script>

<style lang="postcss" scoped>
.form-error {
  @apply flex items-center bg-red-400 dark:bg-red-800 bg-opacity-20 dark:bg-opacity-10 px-2 py-1 rounded-md;
}

.form-error--border {
  @apply border border-red-600 dark:border-red-300 border-opacity-20 dark:border-opacity-10;
}

.form-error__icon {
  @apply w-4 h-4 fill-current mr-1;
}

.form-error__icon,
.form-error__message {
  @apply text-red-600 dark:text-red-300;
}

.form-error__message {
  @apply text-sm;
}
</style>
