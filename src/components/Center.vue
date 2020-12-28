<template>
  <div class="fixed inset-0">
    <div class="flex justify-center items-center">
      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <slot></slot>
    </div>
  </div>
</template>
