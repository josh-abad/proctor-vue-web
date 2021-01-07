<template>
  <Center v-once>
    <div class="flex flex-col items-center">
      <div class="font-thin text-2xl text-white">
        Sorry, that page cannot be found.
      </div>
      <BaseButton class="mt-3" @click="$router.push('/')" prominent
        >Go Home</BaseButton
      >
    </div>
  </Center>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import Center from '@/components/Center.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseButton, Center },
  name: 'NotFound'
})
</script>
