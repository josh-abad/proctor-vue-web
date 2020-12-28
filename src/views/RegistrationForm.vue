<template>
  <div class="fixed inset-0">
    <div class="flex justify-center items-center">
      <Center />
      <BasePanel class="px-10 py-8">
        <div class="flex justify-center">
          <img
            :src="require(`@/assets/${logoFilename}`)"
            alt="Logo"
            class="h-7"
          />
        </div>
        <form class="mt-8">
          <h3 class="font-semibold text-lg">Sign up</h3>
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
          <div class="flex">
            <div class="mt-8 mr-4">
              <label for="firstName">
                <BaseLabel>First Name</BaseLabel>
              </label>
              <BaseInput id="firstName" v-model="firstName" type="text" />
            </div>
            <div class="mt-8">
              <label for="lastName">
                <BaseLabel>Last Name</BaseLabel>
              </label>
              <BaseInput id="lastName" v-model="lastName" type="text" />
            </div>
          </div>
          <div class="mt-4">
            <label for="username">
              <BaseLabel>Username</BaseLabel>
            </label>
            <BaseInput
              id="username"
              class="w-full"
              v-model="username"
              type="text"
            />
          </div>
          <div class="mt-4">
            <label for="password">
              <BaseLabel>Password</BaseLabel>
            </label>
            <BaseInput
              id="password"
              class="w-full"
              v-model="password"
              type="password"
            />
          </div>
          <div class="mt-4">
            <label for="confirmPassword">
              <BaseLabel>Confirm Password</BaseLabel>
            </label>
            <BaseInput
              id="confirmPassword"
              class="w-full"
              v-model="confirmPassword"
              type="password"
            />
          </div>
          <div class="mt-8">
            <BaseButton
              @click.prevent="handleRegister"
              :disabled="!passwordsEqual"
              type="submit"
              prominent
            >
              Sign Up
            </BaseButton>
          </div>
          <p class="mt-3 text-xs">
            Already have an account?
            <router-link
              to="/login"
              class="uppercase font-semibold tracking-wide text-green-500"
              >Log In</router-link
            >
          </p>
        </form>
      </BasePanel>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import Center from '@/components/Center.vue'
import { SIGN_UP } from '@/store/action-types'
import { Theme, UserCredentials } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseButton, BaseInput, Center, BaseLabel, BasePanel },
  name: 'RegistrationForm',
  data () {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    passwordsEqual (): boolean {
      return this.password.length > 0 && this.password === this.confirmPassword
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
    async handleRegister () {
      const credentials: UserCredentials = {
        name: {
          first: this.firstName,
          last: this.lastName
        },
        username: this.username,
        password: this.password
      }
      try {
        await this.$store.dispatch(SIGN_UP, credentials)
        this.$router.push('/')
        this.firstName = ''
        this.lastName = ''
        this.username = ''
        this.password = ''
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>
