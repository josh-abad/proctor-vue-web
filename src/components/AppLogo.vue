<template>
  <img
    :src="require(`@/assets/${logoFilename}`)"
    alt="Proctor Vue logo"
    class="h-7"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Theme } from '@/types'

export default defineComponent({
  name: 'AppLogo',
  computed: {
    logoFilename (): string {
      const theme: Theme = this.$store.getters.theme

      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'logo-white.png'
      }
      return 'logo.png'
    }
  }
})
</script>
