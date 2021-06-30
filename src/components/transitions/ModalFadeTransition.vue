<template>
  <transition
    enter-active-class="duration-300 ease-out"
    leave-active-class="duration-200 ease-in"
    enter-from-class="opacity-0 translate-y-4 sm:scale-95 sm:translate-y-0"
    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
    leave-to-class="opacity-0 translate-y-4 sm:scale-95 sm:translate-y-0"
  >
    <slot></slot>
  </transition>
</template>
