<template>
  <teleport to="#modals">
    <div
      class="fixed z-30 inset-0 overflow-y-auto bg-gradient-to-t from-green-700 to-green-900"
    >
      <ColorBackgroundCard>
        <div class="p-4">
          <img
            src="../assets/logo-white.png"
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
import { defineComponent } from 'vue'
import ColorBackgroundCard from './ColorBackgroundCard.vue'

export default defineComponent({
  name: 'Redirect',
  components: { ColorBackgroundCard },
  mounted () {
    setTimeout(() => {
      this.$router.replace('/')
    }, 5000)
  }
})
</script>
