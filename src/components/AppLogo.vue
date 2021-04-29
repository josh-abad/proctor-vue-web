<template>
  <img :src="logoFilename" alt="Proctor Vue logo" class="h-7" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Theme } from '@/types'
import logoWhite from '@/assets/logo-white.png'
import logo from '@/assets/logo.png'

export default defineComponent({
  name: 'AppLogo',
  computed: {
    logoFilename (): string {
      const theme: Theme = this.$store.getters.theme

      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return logoWhite
      }
      return logo
    }
  }
})
</script>
