<template>
  <Center>
    <BasePanel class="px-10 py-8">
      <div class="flex justify-center">
        <img
          :src="require(`@/assets/${logoFilename}`)"
          alt="Logo"
          class="h-7"
        />
      </div>
      <form class="mt-8">
        <h3 class="font-medium">Login</h3>
        <p class="text-xs dark:text-gray-400">
          By continuing, you agree to our
          <router-link to="#" class="text-green-500"
            >User Agreement</router-link
          >
          and
          <router-link to="#" class="text-green-500">Privacy Policy</router-link
          >.
        </p>
        <div class="mt-8">
          <label for="username">
            <BaseLabel>Username</BaseLabel>
          </label>
          <BaseInput
            class="w-full"
            id="username"
            type="text"
            v-model="username"
          />
        </div>
        <div class="mt-4">
          <label for="password">
            <BaseLabel>Password</BaseLabel>
          </label>
          <BaseInput
            class="w-full"
            id="password"
            type="password"
            v-model="password"
          />
        </div>
        <div class="mt-8">
          <BaseButton
            @click.prevent="handleLogin"
            :disabled="!fieldsFilled"
            type="submit"
            prominent
            >Sign In</BaseButton
          >
        </div>
        <p class="mt-3 text-xs">
          Forgot your
          <router-link to="#" class="text-green-500">username</router-link> or
          <router-link to="#" class="text-green-500">password</router-link>?
        </p>
        <p class="mt-3 text-xs">
          New to Proctor Vue?
          <router-link
            to="/register"
            class="uppercase font-semibold tracking-wide text-green-500"
            >Sign Up</router-link
          >
        </p>
      </form>
    </BasePanel>
  </Center>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import Center from '@/components/Center.vue'
import { LOG_IN } from '@/store/action-types'
import { Theme } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseButton, BaseInput, Center, BasePanel, BaseLabel },
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    fieldsFilled (): boolean {
      return this.username.length > 0 && this.password.length > 0
    },
    logoFilename (): string {
      const theme: Theme = this.$store.state.theme

      if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        return 'logo-white.png'
      }
      return 'logo.png'
    }
  },
  methods: {
    async handleLogin () {
      await this.$store.dispatch(LOG_IN, {
        username: this.username,
        password: this.password
      })
      this.$router.push((this.$route.query.redirect as string) || '/')
      this.username = ''
      this.password = ''
    }
  }
})
</script>
