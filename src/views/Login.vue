<template>
  <div>
    <ColorBackgroundCard>
      <div class="p-4">
        <AppLogo class="h-7" />
        <form class="mt-4" @submit.prevent="handleLogin">
          <h3 class="font-medium">Login</h3>
          <p class="text-xs text-gray-400">
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
              <AppLabel>Email</AppLabel>
            </label>
            <AppInput class="w-full" id="email" type="text" v-model="email" />
          </div>
          <div class="mt-2">
            <label for="password">
              <AppLabel>Password</AppLabel>
            </label>
            <AppInput
              class="w-full"
              id="password"
              type="password"
              v-model="password"
            />
          </div>
          <div class="mt-4">
            <AppButton
              class="w-32 h-9"
              :loading="isLoading"
              :disabled="!fieldsFilled"
              type="submit"
              prominent
            >
              Sign In
            </AppButton>
          </div>
          <p class="mt-3 text-xs">
            Forgot your
            <router-link to="#" class="text-green-500">password</router-link>?
          </p>
          <p class="mt-3 text-xs">
            New to Proctor Vue?
            <router-link
              to="/register"
              class="font-semibold tracking-wide text-green-500 uppercase"
              >Sign Up</router-link
            >
          </p>
        </form>
      </div>
    </ColorBackgroundCard>
  </div>
</template>

<script lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import { defineComponent, ref } from 'vue'
import ColorBackgroundCard from '@/components/ColorBackgroundCard.vue'
import AppLogo from '@/components/AppLogo.vue'
import loginService from '@/services/login'
import authService from '@/services/auth'
import { useStore } from '@/store'
import { SET_USER } from '@/store/mutation-types'
import { useRouter } from 'vue-router'
import useSnackbar from '@/composables/use-snackbar'

export default defineComponent({
  name: 'Login',
  components: {
    AppButton,
    AppInput,
    AppLabel,
    ColorBackgroundCard,
    AppLogo
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const { setSnackbarMessage } = useSnackbar()

    const email = ref('')
    const password = ref('')

    const isLoading = ref(false)

    const handleLogin = async () => {
      try {
        isLoading.value = true
        const user = await loginService.login({
          email: email.value,
          password: password.value
        })
        store.commit(SET_USER, user)
        localStorage.setItem('loggedAppUser', JSON.stringify(user))
        authService.setToken(user.token)
        router.push((router.currentRoute.value.query.redirect as string) || '/')
      } catch (error) {
        setSnackbarMessage('Incorrect email or password', 'error')
      } finally {
        isLoading.value = false
        password.value = ''
      }
    }

    return {
      email,
      password,
      handleLogin,
      isLoading
    }
  },
  computed: {
    fieldsFilled(): boolean {
      return this.email.length > 0 && this.password.length > 0
    }
  }
})
</script>
