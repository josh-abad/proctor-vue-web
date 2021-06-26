<template>
  <transition
    enter-active-class="duration-300 ease-out"
    leave-active-class="duration-200 ease-in"
    enter-from-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
    enter-to-class="translate-y-0 opacity-100 sm:scale-100"
    leave-from-class="translate-y-0 opacity-100 sm:scale-100"
    leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
  >
    <slot></slot>
  </transition>
</template>
