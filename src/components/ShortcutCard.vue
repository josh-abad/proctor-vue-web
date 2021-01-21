<template>
  <router-link :to="url || '#'">
    <div
      class="px-6 pt-6 pb-5 rounded-lg box-border group transition duration-500 ease-in-out transform bg-none bg-green-500 shadow hover:shadow-lg hover:bg-green-400 active:scale-95 cursor-pointer w-24 h-24 overflow-hidden"
    >
      <div class="flex flex-col items-center">
        <div
          v-html="icon"
          class="stroke-current text-green-200 group-hover:text-white w-8 h-8"
        ></div>
        <div
          class="text-sm mt-1 text-green-100 group-hover:text-white truncate"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ShortcutCard',
  props: {
    icon: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: false
    },
    quantity: {
      type: Number,
      required: false
    }
  }
})
</script>
