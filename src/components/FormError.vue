<template>
  <div class="form-error form-error--border">
    <!-- Heroicons name: exclamation -->
    <svg class="form-error__icon" viewBox="0 0 20 20" fill="currentColor">
      <path
        fill-rule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clip-rule="evenodd"
      />
    </svg>
    <div class="form-error__message"><slot /></div>
  </div>
</template>

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
