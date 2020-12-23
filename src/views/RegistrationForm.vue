<template>
  <div class="py-24 flex justify-center items-center">
    <div
      class="bg-white dark:bg-gray-800 border dark:border-gray-700 shadow rounded-xl px-10 py-8 flex flex-col"
    >
      <form>
        <h3 class="font-semibold text-lg">Sign up</h3>
        <p class="text-xs dark:text-gray-400">
          By continuing, you agree to our
          <router-link to="#" class="text-green-400"
            >User Agreement</router-link
          >
          and
          <router-link to="#" class="text-green-400">Privacy Policy</router-link
          >.
        </p>
        <div class="flex">
          <div class="mt-8 mr-4">
            <BaseInput placeholder="First name" v-model="firstName" />
          </div>
          <div class="mt-8">
            <BaseInput placeholder="Last name" v-model="lastName" />
          </div>
        </div>
        <div class="mt-4">
          <BaseInput class="w-full" placeholder="Username" v-model="username" />
        </div>
        <div class="mt-4">
          <BaseInput
            class="w-full"
            placeholder="Password"
            v-model="password"
            type="password"
          />
        </div>
        <div class="mt-4">
          <BaseInput
            class="w-full"
            placeholder="Confirm Password"
            v-model="confirmPassword"
            type="password"
          />
        </div>
        <div class="mt-8">
          <BaseButton
            label="Sign Up"
            @click.prevent="handleRegister"
            :disabled="!passwordsEqual"
            type="submit"
          />
        </div>
        <p class="mt-3 text-xs">
          Already have an account?
          <router-link
            to="/login"
            class="uppercase font-semibold tracking-wide text-green-400"
            >Log In</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import { SIGN_UP } from '@/store/action-types'
import { UserCredentials } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseButton, BaseInput },
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
        password: this.password,
        role: 'student'
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
