<template>
  <teleport to="#modals">
    <div
      class="fixed inset-0 z-30 overflow-y-auto bg-gradient-to-t from-green-700 to-green-900"
    >
      <ColorBackgroundCard>
        <div class="p-4">
          <AppLogo @click="$router.push('/')" class="h-7" />
          <div class="mt-4 text-xl font-semibold">Welcome back!</div>
          <div class="mt-4">
            You are already logged in and will be redirected back to Proctor Vue
            shortly.
          </div>
          <div class="mt-4 text-sm text-gray-500">
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
import { defineComponent } from 'vue'
import AppLogo from './AppLogo.vue'
import ColorBackgroundCard from './ColorBackgroundCard.vue'

export default defineComponent({
  name: 'Redirect',
  components: { ColorBackgroundCard, AppLogo },
  mounted () {
    setTimeout(() => {
      this.$router.replace('/')
    }, 5000)
  }
})
</script>
