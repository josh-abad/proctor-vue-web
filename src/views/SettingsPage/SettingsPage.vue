<template>
  <div class="p-4">
    <AppPanel class="w-full md:w-1/2">
      <div class="flex items-center">
        <CogIcon class="w-6 h-6 fill-current" />
        <div class="ml-2 text-2xl font-semibold">Settings</div>
      </div>
      <div class="mt-4">
        <AppAccordion label="User">
          <SettingsItem
            name="Change Password"
            description="Password must be at least 6 characters"
          >
            <AppButton>Change</AppButton>
          </SettingsItem>
          <SettingsItem
            name="Configure Face ID"
            description="Set up facial identification for exams"
            class="mt-2"
          >
            <router-link :to="`/user/${$store.state.user?.id}/reference-image`">
              <AppButton>Configure</AppButton>
            </router-link>
          </SettingsItem>
        </AppAccordion>
        <AppAccordion label="Appearance" class="mt-2">
          <SettingsItem name="Automatic" description="Follows system settings">
            <AppSwitch v-model="automatic" />
          </SettingsItem>
          <SettingsItem name="Dark Mode">
            <AppSwitch v-model="darkMode" :disabled="automatic" />
          </SettingsItem>
        </AppAccordion>
      </div>
      <div class="mt-4">
        <header class="label-border">
          <AppLabel emphasis> Deactivate Account </AppLabel>
        </header>
        <section class="py-4">
          <button
            id="btn-open"
            class="flex items-center text-red-500 focus:outline-none"
            @click="deleteAccountModal = true"
          >
            <TrashIcon class="w-5 h-5 pointer-events-none fill-current" />
            <span
              class="ml-1 text-sm font-bold tracking-wide uppercase pointer-events-none "
            >
              Deactivate Account
            </span>
          </button>
          <teleport to="#modals">
            <AppModal v-model="deleteAccountModal">
              <template #header> Deactivate Account </template>
              <template #body>
                Are you sure you want to deactivate your account?
              </template>
              <template #action>
                <AppButton @click="deactivateAccount" prominent>
                  Deactivate
                </AppButton>
              </template>
            </AppModal>
          </teleport>
        </section>
      </div>
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppAccordion from '@/components/ui/AppAccordion.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import AppSwitch from '@/components/ui/AppSwitch.vue'
import { defineComponent, ref } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import usersService from '@/services/users'
import AppModal from '@/components/ui/AppModal.vue'
import SettingsItem from './components/SettingsItem.vue'
import { TrashIcon, CogIcon } from '@heroicons/vue/solid'
import useTheme from '@/composables/use-theme'
import useSnackbar from '@/composables/use-snackbar'

export default defineComponent({
  name: 'SettingsPage',
  components: {
    AppSwitch,
    AppPanel,
    AppAccordion,
    AppButton,
    AppLabel,
    AppModal,
    SettingsItem,
    CogIcon,
    TrashIcon
  },
  setup() {
    const { theme, isSystemTheme, setTheme } = useTheme()
    const { setSnackbarMessage } = useSnackbar()

    const deleteAccountModal = ref(false)

    return {
      theme,
      isSystemTheme,
      setTheme,
      setSnackbarMessage,
      deleteAccountModal
    }
  },
  data() {
    return {
      automatic: false,
      darkMode: false
    }
  },
  watch: {
    automatic(enabled: boolean) {
      if (enabled) {
        this.setTheme('system')
      } else {
        this.setTheme(this.darkMode ? 'dark' : 'light')
      }
    },
    darkMode(enabled: boolean) {
      this.setTheme(enabled ? 'dark' : 'light')
    }
  },
  mounted() {
    if (this.isSystemTheme) {
      this.automatic = true
    } else {
      this.darkMode = this.theme === 'dark'
    }
  },
  methods: {
    async deactivateAccount() {
      this.deleteAccountModal = false
      if (this.$store.state.user) {
        try {
          await usersService.deleteUser(this.$store.state.user.id)
          this.$router.push('/login')
          this.setSnackbarMessage('Student removed', 'success')
        } catch (error) {
          this.setSnackbarMessage('Could not delete student.', 'error')
        }
      }
    }
  }
})
</script>
