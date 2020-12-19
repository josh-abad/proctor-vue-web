<template>
  <div class="home dark:text-gray-200 text-xl">
    <div v-if="user">
      Home page
      <BaseButton
        @click="$store.dispatch('alert', 'This is a snackbar')"
        label="Show snackbar"
      />
      <BaseButton
        @click="
          $store.commit('displayDialog', {
            header: 'Test',
            actionLabel: 'Confirm',
            message: 'This is a test',
          })
        "
        label="Show dialog"
      />
      <h1>Appearance</h1>
      <div class="inline-flex flex-col space-y-5">
        <BaseButton
          @click="handleChangeTheme('light')"
          label="Light"
          :filled="!(theme === 'light')"
          class="mt-5"
        />
        <BaseButton
          @click="handleChangeTheme('dark')"
          label="Dark Theme"
          :filled="!(theme === 'dark')"
        />
        <BaseButton
          @click="handleChangeTheme(null)"
          label="System"
          :filled="!(theme === null)"
        />
      </div>
    </div>
    <div v-else>you are not logged in smh</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Theme, User } from '@/types'
import BaseButton from '@/components/BaseButton.vue'

export default defineComponent({
  components: { BaseButton },
  name: 'Home',
  methods: {
    handleChangeTheme (theme: Theme) {
      this.$store.commit('setTheme', theme)
    }
  },
  computed: {
    user (): User {
      return this.$store.state.user
    },
    theme (): Theme {
      return this.$store.state.theme
    }
  }
})
</script>
