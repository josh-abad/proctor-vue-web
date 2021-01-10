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
            <div class="mt-4 mr-4">
              <label for="firstName">
                <BaseLabel>First Name</BaseLabel>
              </label>
              <BaseInput id="firstName" v-model="firstName" type="text" />
            </div>
            <div class="mt-4">
              <label for="lastName">
                <BaseLabel>Last Name</BaseLabel>
              </label>
              <BaseInput id="lastName" v-model="lastName" type="text" />
            </div>
          </div>
          <div class="mt-2">
            <label for="email">
              <BaseLabel>Email</BaseLabel>
            </label>
            <BaseInput
              id="email"
              class="w-full"
              v-model="email"
              type="text"
              :error="!emailValid"
            />
          </div>
          <div class="mt-2">
            <label for="password">
              <BaseLabel>Password</BaseLabel>
            </label>
            <BaseInput
              id="password"
              class="w-full"
              v-model="password"
              type="password"
              :error="!passwordsMatch"
            />
          </div>
          <div class="mt-2">
            <label for="confirmPassword">
              <BaseLabel>Confirm Password</BaseLabel>
            </label>
            <BaseInput
              id="confirmPassword"
              class="w-full"
              v-model="confirmPassword"
              type="password"
              :error="!passwordsMatch"
            />
          </div>
          <div class="mt-4">
            <BaseButton
              @click.prevent="handleRegister"
              :disabled="!allFieldsFilled || !!error"
              type="submit"
              prominent
            >
              Sign Up
            </BaseButton>
            <span v-if="error" class="ml-4 text-xs text-red-500">{{
              error
            }}</span>
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
      </div>
    </ColorBackgroundCard>
    <Redirect v-else />
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import { ALERT, SIGN_UP } from '@/store/action-types'
import { UserCredentials } from '@/types'
import { defineComponent } from 'vue'
import logoMixin from '@/mixins/logo'
import ColorBackgroundCard from '@/components/ColorBackgroundCard.vue'
import Redirect from '@/components/Redirect.vue'

export default defineComponent({
  name: 'RegistrationForm',
  components: { BaseButton, BaseInput, BaseLabel, ColorBackgroundCard, Redirect },
  mixins: [logoMixin],
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    allFieldsFilled (): boolean {
      return !!this.firstName && !!this.lastName && !!this.email && !!this.password && !!this.confirmPassword
    },
    passwordsMatch (): boolean {
      return ((!!this.password && !this.confirmPassword) || (!this.password && !!this.confirmPassword)) || this.password === this.confirmPassword
    },
    emailValid (): boolean {
      return !this.email || !!this.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    },
    error (): string {
      let error = ''
      if (!this.passwordsMatch) {
        error = 'Passwords do not match'
      }
      if (!this.emailValid) {
        error = 'Invalid email'
      }
      return error
    }
  },
  methods: {
    async handleRegister () {
      const credentials: UserCredentials = {
        name: {
          first: this.firstName,
          last: this.lastName
        },
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch(SIGN_UP, credentials)
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.password = ''
        this.confirmPassword = ''
      } catch (error) {
        this.$store.dispatch(ALERT, credentials)
      }
    }
  }
})
</script>
