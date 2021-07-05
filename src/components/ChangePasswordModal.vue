<template>
  <AppButton @click="modal = true" id="change-password-modal-btn">
    Change
  </AppButton>
  <teleport to="#modals">
    <AppModal
      v-model="modal"
      click-outside-id="change-password-modal-btn"
      class="w-96"
    >
      <template #header> Update your password </template>
      <template #body>
        <div>
          <div>
            <AppLabel>
              <label for="oldPassword">Old Password</label>
            </AppLabel>
            <AppInput
              class="w-full"
              type="password"
              v-model="oldPassword"
              id="oldPassword"
            />
          </div>
          <div class="mt-3">
            <AppLabel>
              <label for="newPassword">New Password</label>
            </AppLabel>
            <AppInput
              class="w-full"
              type="password"
              v-model="newPassword"
              id="newPassword"
            />
          </div>
          <div class="mt-3">
            <AppLabel>
              <label for="newPasswordConfirm">Confirm Password</label>
            </AppLabel>
            <AppInput
              class="w-full"
              type="password"
              v-model="newPasswordConfirm"
              id="newPasswordConfirm"
            />
          </div>
        </div>
      </template>
      <template #action>
        <AppButton
          type="submit"
          class="w-28"
          :disabled="!isFormValid"
          :loading="isLoading"
          @click="changePassword"
          prominent
        >
          Save
        </AppButton>
      </template>
    </AppModal>
  </teleport>
</template>

<script lang="ts">
import useSnackbar from '@/composables/use-snackbar'
import userService from '@/services/user'
import { useStore } from '@/store'
import { SET_USER } from '@/store/mutation-types'
import { computed, defineComponent, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from './ui/AppButton.vue'
import AppInput from './ui/AppInput.vue'
import AppLabel from './ui/AppLabel.vue'
import AppModal from './ui/AppModal.vue'

export default defineComponent({
  name: 'ChangePasswordModal',
  components: { AppButton, AppInput, AppLabel, AppModal },
  setup() {
    const store = useStore()
    const router = useRouter()

    const oldPassword = ref('')
    const newPassword = ref('')
    const newPasswordConfirm = ref('')

    const isLoading = ref(false)

    const { setSnackbarMessage } = useSnackbar()

    const changePassword = async () => {
      try {
        isLoading.value = true
        await userService.changePassword(oldPassword.value, newPassword.value)
        setSnackbarMessage('Successfully changed password.', 'success')
        resetFields()
        localStorage.clear()
        store.commit(SET_USER, null)
        router.push('/login')
      } catch (error) {
        setSnackbarMessage(error.response.data.error, 'error')
      } finally {
        isLoading.value = false
      }
    }

    const isFormValid = computed(() => {
      return (
        oldPassword.value.length > 0 &&
        newPassword.value.length > 0 &&
        newPassword.value === newPasswordConfirm.value
      )
    })

    const modal = ref(false)

    const resetFields = () => {
      oldPassword.value = ''
      newPassword.value = ''
      newPasswordConfirm.value = ''
    }

    watchEffect(() => {
      if (!modal.value) {
        resetFields()
      }
    })

    return {
      oldPassword,
      newPassword,
      newPasswordConfirm,
      changePassword,
      isLoading,
      isFormValid,
      modal
    }
  }
})
</script>
