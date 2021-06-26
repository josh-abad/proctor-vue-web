<template>
  <transition
    enter-active-class="transition-all duration-100 ease-out"
    leave-active-class="transition-all duration-75 ease-in"
    enter-from-class="scale-95 opacity-0"
    enter-to-class="scale-100 opacity-100"
    leave-from-class="scale-100 opacity-100"
    leave-to-class="scale-95 opacity-0"
  >
    <slot></slot>
  </transition>
</template>
