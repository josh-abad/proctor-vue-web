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
    <!-- <span
      v-if="quantity"
      class="absolute right-0 top-0 -mt-2 -mr-2 rounded-full bg-gradient-to-tr from-red-600 to-red-400 text-white p-1 text-xs w-6 h-6 text-center"
      >{{ quantity }}</span
    > -->
  </BasePanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasePanel from './BasePanel.vue'

export default defineComponent({
  components: { BasePanel },
  name: 'NavCard',
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
