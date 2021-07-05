<template>
  <ColorBackgroundCard class="w-1/2">
    <div class="p-4">
      <AppLogo class="h-7" />
      <form @submit.prevent="sendPasswordResetLink" class="mt-4">
        <header class="font-medium">Reset your password</header>
        <p class="text-xs text-gray-400 w-[80%]">
          Tell us the email address associated with your Proctor Vue account,
          and we’ll send you an email with a link to reset your password.
        </p>
        <div class="mt-4">
          <AppLabel><label for="email">Email</label></AppLabel>
          <AppInput type="text" v-model="email" id="email" class="w-2/3" />
        </div>
        <div class="mt-4">
          <AppButton
            type="submit"
            :disabled="!isFormValid"
            :loading="isLoading"
            prominent
            class="w-40 h-9"
          >
            Reset Password
          </AppButton>
        </div>
        <p class="mt-3 uppercase text-xs font-semibold tracking-wide">
          <router-link to="/login" class="text-indigo-600 dark:text-indigo-400">
            Log In
          </router-link>
          •
          <router-link
            to="/register"
            class="text-indigo-600 dark:text-indigo-400"
          >
            Sign Up
          </router-link>
        </p>
      </form>
    </div>
  </ColorBackgroundCard>
</template>

<script lang="ts">
import useSnackbar from '@/composables/use-snackbar'
import userService from '@/services/user'
import { computed, defineComponent, ref } from 'vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppButton from '@/components/ui/AppButton.vue'
import ColorBackgroundCard from '@/components/ColorBackgroundCard.vue'
import AppLogo from '@/components/AppLogo.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ForgotPasswordPage',
  components: { AppInput, AppLabel, AppButton, ColorBackgroundCard, AppLogo },
  setup() {
    const router = useRouter()

    const email = ref('')

    const { setSnackbarMessage } = useSnackbar()

    const isLoading = ref(false)

    const sendPasswordResetLink = async () => {
      try {
        isLoading.value = true
        await userService.sendPasswordResetLink(email.value)
        setSnackbarMessage(
          'The password reset link has been sent to your email',
          'success'
        )
        router.push('/login')
      } catch (error) {
        setSnackbarMessage(error.response.data.error, 'error')
      } finally {
        isLoading.value = false
      }
    }

    const isFormValid = computed(() => {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email.value
      )
    })

    return {
      email,
      sendPasswordResetLink,
      isLoading,
      isFormValid
    }
  }
})
</script>
