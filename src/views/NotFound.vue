<template>
  <div class="fixed inset-0" v-once>
    <div class="flex justify-center items-center">
      <Center />
      <div class="flex flex-col items-center">
        <div class="font-thin text-2xl">Sorry, that page cannot be found.</div>
        <BaseButton class="mt-3" @click="$router.push('/')" prominent
          >Go Home</BaseButton
        >
      </div>
    </div>
  </div>
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
