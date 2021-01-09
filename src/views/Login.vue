<template>
  <div>
    <ColorBackgroundCard v-if="!$store.state.user">
      <div class="p-4">
        <img
          :src="require(`@/assets/${logoFilename}`)"
          alt="Logo"
          class="h-7"
        />
        <form class="mt-4">
          <h3 class="font-medium">Login</h3>
          <p class="text-xs dark:text-gray-400">
            By continuing, you agree to our
            <router-link to="#" class="text-green-500"
              >User Agreement</router-link
            >
            and
            <router-link to="#" class="text-green-500"
              >Privacy Policy</router-link
            >.
          </p>
          <div class="mt-4">
            <label for="email">
              <BaseLabel>Email</BaseLabel>
            </label>
            <BaseInput class="w-full" id="email" type="text" v-model="email" />
          </div>
          <div class="mt-2">
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
          <div class="mt-4">
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
      </div>
    </ColorBackgroundCard>
    <Redirect v-else />
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import { LOG_IN } from '@/store/action-types'
import { defineComponent } from 'vue'
import logoMixin from '@/mixins/logo'
import ColorBackgroundCard from '@/components/ColorBackgroundCard.vue'
import Redirect from '@/components/Redirect.vue'

export default defineComponent({
  components: { BaseButton, BaseInput, BaseLabel, ColorBackgroundCard, Redirect },
  name: 'Login',
  mixins: [logoMixin],
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    fieldsFilled (): boolean {
      return this.email.length > 0 && this.password.length > 0
    }
  },
  methods: {
    async handleLogin () {
      await this.$store.dispatch(LOG_IN, {
        email: this.email,
        password: this.password
      })
      this.email = ''
      this.password = ''
    }
  }
})
</script>
