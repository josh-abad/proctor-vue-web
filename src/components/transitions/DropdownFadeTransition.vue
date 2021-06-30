<template>
  <transition
    enter-active-class="transition-all duration-100 ease-out"
    leave-active-class="transition-all duration-75 ease-in"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <slot></slot>
  </transition>
</template>
