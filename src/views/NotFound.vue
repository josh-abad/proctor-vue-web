<template>
  <div v-once>
    <div class="flex flex-col justify-center items-center py-40">
      <div class="font-thin text-2xl">
        Sorry, that page cannot be found.
      </div>
      <BaseButton class="mt-3" @click="$router.push('/')">Go Home</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseButton },
  name: 'NotFound'
})
</script>
