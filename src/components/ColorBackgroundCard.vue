<template>
  <Center
    class="bg-gradient-to-t from-green-300 to-green-100 dark:from-green-700 dark:to-green-500"
  >
    <BasePanel class="flex overflow-hidden">
      <div class="-mb-12">
        <img
          class="w-60 h-full -m-6 object-cover"
          src="https://cdn.pixabay.com/photo/2020/04/16/11/13/background-5050213_1280.png"
          alt="Panel Background"
        />
      </div>
      <slot></slot>
    </BasePanel>
  </Center>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BasePanel from './BasePanel.vue'
import Center from './Center.vue'

export default defineComponent({
  components: { Center, BasePanel },
  name: 'ColorBackgroundCard'
})
</script>
