<template>
  <teleport to="#modals">
    <div
      class="fixed z-30 inset-0 overflow-y-auto bg-gradient-to-t from-green-700 to-teal-900 dark:from-green-700 dark:to-teal-900"
    >
      <ColorBackgroundCard>
        <div class="p-4">
          <img
            :src="require(`@/assets/${logoFilename}`)"
            alt="Logo"
            class="h-7"
            @click="$router.push('/')"
          />
          <div class="mt-4 font-semibold text-xl">Welcome back!</div>
          <div class="mt-4">
            You are already logged in and will be redirected back to Proctor Vue
            shortly.
          </div>
          <div class="mt-4 text-gray-500 text-sm">
            If you are not redirected automatically, follow
            <router-link to="/" class="text-green-500" replace
              >this link</router-link
            >.
          </div>
        </div>
      </ColorBackgroundCard>
    </div>
  </teleport>
</template>

<script lang="ts">
import logoMixin from '@/mixins/logo'
import { defineComponent } from 'vue'
import ColorBackgroundCard from './ColorBackgroundCard.vue'

export default defineComponent({
  components: { ColorBackgroundCard },
  name: 'Redirect',
  mixins: [logoMixin],
  mounted () {
    setTimeout(() => {
      this.$router.replace('/')
    }, 5000)
  }
})
</script>
