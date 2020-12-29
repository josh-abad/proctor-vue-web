<template>
  <BasePanel
    class="group pb-4 transition duration-500 ease-in-out transform hover:translate-y-1 hover:scale-105 hover:shadow-lg dark:hover:bg-green-500 flex flex-col items-center cursor-pointer w-50 h-50"
    @click="$router.push(url || '#')"
  >
    <div
      v-html="icon"
      class="stroke-current dark:text-gray-400 dark:group-hover:text-white w-8 h-8"
    ></div>
    <div class="text-sm mt-2"><slot></slot></div>
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
    }
  }
})
</script>
