<template>
  <BasePanel
    class="box-border group pb-5 transition duration-500 ease-in-out transform bg-green-500 dark:bg-teal-500 hover:shadow-lg hover:bg-green-400 dark:hover:bg-teal-400 active:scale-95 cursor-pointer w-24 h-24 overflow-hidden"
    @click="$router.push(url || '#')"
  >
    <div class="flex flex-col items-center">
      <div
        v-html="icon"
        class="stroke-current text-green-200 group-hover:text-white w-8 h-8"
      ></div>
      <div class="text-sm mt-1 text-green-100 group-hover:text-white truncate">
        <slot></slot>
      </div>
    </div>
  </BasePanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasePanel from './BasePanel.vue'

export default defineComponent({
  name: 'ShortcutCard',
  components: { BasePanel },
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
