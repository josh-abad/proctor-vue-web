<template>
  <transition
    enter-active-class="transition-opacity ease-in duration-200"
    leave-active-class="transition-opacity ease-in duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    mode="out-in"
  >
    <slot></slot>
  </transition>
</template>
