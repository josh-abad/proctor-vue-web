<template>
  <div>
    <ColorBackgroundCard>
      <div class="p-4">
        <AppLogo class="h-7" />
        <form class="mt-4" @submit.prevent="handleRegister">
          <h3 class="text-lg font-semibold">Sign up</h3>
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
          <div class="flex">
            <div class="mt-4 mr-4">
              <label for="firstName">
                <AppLabel>First Name</AppLabel>
              </label>
              <AppInput id="firstName" v-model="firstName" type="text" />
            </div>
            <div class="mt-4">
              <label for="lastName">
                <AppLabel>Last Name</AppLabel>
              </label>
              <AppInput id="lastName" v-model="lastName" type="text" />
            </div>
          </div>
          <div class="mt-2">
            <label for="email">
              <AppLabel>Email</AppLabel>
            </label>
            <AppInput
              id="email"
              class="w-full"
              v-model="email"
              type="text"
              :error="!emailValid"
            />
          </div>
          <div class="mt-2">
            <label for="password">
              <AppLabel>Password</AppLabel>
            </label>
            <AppInput
              id="password"
              class="w-full"
              v-model="password"
              type="password"
              :error="!passwordsMatch"
            />
          </div>
          <div class="mt-2">
            <label for="confirmPassword">
              <AppLabel>Confirm Password</AppLabel>
            </label>
            <AppInput
              id="confirmPassword"
              class="w-full"
              v-model="confirmPassword"
              type="password"
              :error="!passwordsMatch"
            />
          </div>
          <div class="flex justify-between mt-4">
            <AppButton
              class="w-32 h-9"
              :loading="isLoading"
              :disabled="!allFieldsFilled || !!error"
              type="submit"
              prominent
            >
              Sign Up
            </AppButton>
            <FormError v-show="error">{{ error }}</FormError>
          </div>
          <p class="mt-3 text-xs">
            Already have an account?
            <router-link
              to="/login"
              class="font-semibold tracking-wide text-green-500 uppercase"
              >Log In</router-link
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
import FormError from '@/components/FormError.vue'
import AppLogo from '@/components/AppLogo.vue'
import useSnackbar from '@/composables/use-snackbar'
import usersService from '@/services/users'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'RegistrationForm',
  components: {
    AppButton,
    AppInput,
    AppLabel,
    ColorBackgroundCard,
    FormError,
    AppLogo
  },
  setup() {
    const router = useRouter()
    const { setSnackbarMessage } = useSnackbar()

    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')

    const isLoading = ref(false)

    const handleRegister = async () => {
      try {
        isLoading.value = true
        await usersService.create({
          name: {
            first: firstName.value,
            last: lastName.value
          },
          email: email.value,
          password: password.value
        })
        await router.push('/')
        setSnackbarMessage('Your account has been created.', 'success')
      } catch (error) {
        setSnackbarMessage('Invalid credentials', 'error')
      } finally {
        isLoading.value = false
        password.value = ''
        confirmPassword.value = ''
      }
    }

    return {
      handleRegister,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      isLoading
    }
  },
  computed: {
    allFieldsFilled(): boolean {
      return (
        !!this.firstName &&
        !!this.lastName &&
        !!this.email &&
        !!this.password &&
        !!this.confirmPassword
      )
    },
    passwordsMatch(): boolean {
      return (
        (!!this.password && !this.confirmPassword) ||
        (!this.password && !!this.confirmPassword) ||
        this.password === this.confirmPassword
      )
    },
    emailValid(): boolean {
      return (
        !this.email ||
        !!this.email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
    },
    error(): string {
      let error = ''
      if (!this.passwordsMatch) {
        error = 'Passwords do not match'
      }
      if (!this.emailValid) {
        error = 'Invalid email'
      }
      return error
    }
  }
})
</script>
