<template>
  <div class="py-24 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-700 shadow rounded-xl px-10 py-8 flex flex-col">
      <form>
        <h3 class="font-semibold text-lg">Login</h3>
        <p class="text-xs dark:text-gray-400">By continuing, you agree to our <router-link to="#" class="text-green-400">User Agreement</router-link> and <router-link to="#" class="text-green-400">Privacy Policy</router-link>.</p>
        <div class="mt-8">
          <BaseInput id="username" type="text" placeholder="Username" v-model="username" />
        </div>
        <div class="mt-4">
          <BaseInput id="password" type="password" placeholder="Password" v-model="password" />
        </div>
        <div class="mt-8">
          <BaseButton label="Sign In" @click.prevent="handleLogin" :disabled="!fieldsFilled" type="submit" />
        </div>
        <p class="mt-3 text-xs">
          Forgot your <router-link to="#" class="text-green-400">username</router-link> or <router-link to="#" class="text-green-400">password</router-link>?
        </p>
        <p class="mt-3 text-xs">New to Proctor Vue? <router-link to="/register" class="uppercase font-semibold tracking-wide text-green-400">Sign Up</router-link></p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import { LOG_IN } from '@/store/action-types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseButton, BaseInput },
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
    }
  },
  methods: {
    async handleLogin () {
      await this.$store.dispatch(LOG_IN, {
        username: this.username,
        password: this.password
      })
      this.$router.push(this.$route.query.redirect as string || '/')
      this.username = ''
      this.password = ''
    }
  }
})
</script>
