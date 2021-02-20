<template>
  <Center v-once>
    <div class="flex flex-col items-center">
      <div class="font-thin text-2xl text-white">
        Sorry, that page cannot be found.
      </div>
      <AppButton class="mt-3" @click="$router.push('/')" prominent
        >Go Home</AppButton
      >
    </div>
  </Center>
</template>

<script lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import Center from '@/components/Center.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound',
  components: { AppButton, Center }
})
</script>
