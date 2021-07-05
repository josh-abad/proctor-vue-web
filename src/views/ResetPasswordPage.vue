<template>
  <ColorBackgroundCard>
    <div class="p-4">
      <AppLogo class="h-7" />
      <form @submit.prevent="resetPassword" class="mt-4">
        <header class="font-medium">Reset Password</header>
        <p class="text-xs text-gray-400">
          Choose a new password here, then log in to your account.
        </p>
        <div class="mt-4">
          <div>
            <AppLabel><label for="newPassword">New Password</label></AppLabel>
            <AppInput
              type="password"
              v-model="newPassword"
              id="newPassword"
              class="w-full"
            />
          </div>
          <div class="mt-4">
            <AppLabel>
              <label for="newPasswordConfirm">Confirm Password</label>
            </AppLabel>
            <AppInput
              type="password"
              v-model="newPasswordConfirm"
              id="newPasswordConfirm"
              class="w-full"
            />
          </div>
        </div>
        <div class="mt-4">
          <AppButton
            class="w-32 h-9"
            type="submit"
            :disabled="!isFormValid"
            :loading="isLoading"
            prominent
          >
            Set Password
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

export default defineComponent({
  name: 'ResetPasswordPage',
  components: { AppInput, AppLabel, AppButton, ColorBackgroundCard, AppLogo },
  props: {
    token: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const newPassword = ref('')
    const newPasswordConfirm = ref('')

    const { setSnackbarMessage } = useSnackbar()

    const isLoading = ref(false)

    const resetPassword = async () => {
      try {
        isLoading.value = true
        await userService.resetPassword(newPassword.value, props.token)
        setSnackbarMessage('Your password has been reset', 'success')
      } catch (error) {
        setSnackbarMessage(error.response.data.error, 'error')
      } finally {
        isLoading.value = false
      }
    }

    const isFormValid = computed(() => {
      return (
        newPassword.value.length > 0 &&
        newPassword.value === newPasswordConfirm.value
      )
    })

    return {
      newPassword,
      newPasswordConfirm,
      resetPassword,
      isLoading,
      isFormValid
    }
  }
})
</script>
