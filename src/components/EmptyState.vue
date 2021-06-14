<template>
  <div class="flex flex-col items-center py-20 text-lg text-gray-500">
    <div class="w-12 h-12"><slot name="icon"></slot></div>
    <span class="mt-4">
      <slot name="content"></slot>
    </span>
  </div>
</template>
