<template>
  <BasePanel
    class="group pb-4 transition duration-500 ease-in-out transform bg-green-500 dark:bg-green-500 hover:shadow-lg hover:bg-green-400 dark:hover:bg-green-400 active:scale-95 flex flex-col items-center cursor-pointer w-50 h-50"
    @click="$router.push(url || '#')"
  >
    <div
      v-html="icon"
      class="stroke-current text-green-200 group-hover:text-white w-8 h-8"
    ></div>
    <div class="text-sm mt-2 text-green-100 group-hover:text-white">
      <slot></slot>
    </div>
  </BasePanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasePanel from './BasePanel.vue'

export default defineComponent({
  name: 'NavCard',
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
