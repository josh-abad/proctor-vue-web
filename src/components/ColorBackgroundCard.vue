<template>
  <Center>
    <AppPanel class="flex overflow-hidden">
      <div class="-mb-12">
        <img
          class="object-cover h-full -m-6 w-60"
          src="https://cdn.pixabay.com/photo/2020/04/16/11/13/background-5050213_1280.png"
          alt="Panel Background"
        />
      </div>
      <slot></slot>
    </AppPanel>
  </Center>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppPanel from './ui/AppPanel.vue'
import Center from './Center.vue'

export default defineComponent({
  name: 'ColorBackgroundCard',
  components: { Center, AppPanel }
})
</script>
