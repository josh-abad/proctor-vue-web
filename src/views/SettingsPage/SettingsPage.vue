<template>
  <div class="p-4">
    <PageHeading><template #label> Settings </template></PageHeading>
    <AppPanel class="w-full mt-8 md:w-2/3">
      <Subheading>
        <AppLabel emphasis>User</AppLabel>
      </Subheading>
      <section class="mt-2">
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
          <router-link to="/settings/face-id">
            <AppButton>Configure</AppButton>
          </router-link>
        </SettingsItem>
      </section>

      <Subheading class="mt-4">
        <AppLabel emphasis>Appearance</AppLabel>
      </Subheading>
      <section class="mt-2">
        <SettingsItem name="Automatic" description="Follows system settings">
          <AppSwitch v-model="automatic" />
        </SettingsItem>
        <SettingsItem name="Dark Mode">
          <AppSwitch v-model="darkMode" :disabled="automatic" />
        </SettingsItem>
      </section>

      <div class="mt-4">
        <Subheading>
          <AppLabel emphasis> Deactivate Account </AppLabel>
        </Subheading>
        <section class="mt-6">
          <button
            id="btn-open"
            class="text-red-500 focus:outline-none"
            @click="deactivateAccountModal = true"
          >
            <div class="flex items-center pointer-events-none">
              <TrashIcon class="w-5 h-5 pointer-events-none fill-current" />
              <span class="ml-1 text-sm font-bold tracking-wide uppercase">
                Deactivate Account
              </span>
            </div>
          </button>
          <teleport to="#modals">
            <AppModal v-model="deactivateAccountModal">
              <template #header> Deactivate Account </template>
              <template #body>
                Are you sure you want to deactivate your account?
              </template>
              <template #action>
                <AppButton @click="deactivateAccount" prominent danger>
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
import AppButton from '@/components/ui/AppButton.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import AppSwitch from '@/components/ui/AppSwitch.vue'
import { defineComponent, ref } from 'vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import userService from '@/services/user'
import AppModal from '@/components/ui/AppModal.vue'
import SettingsItem from './components/SettingsItem.vue'
import { TrashIcon } from '@heroicons/vue/solid'
import useTheme from '@/composables/use-theme'
import useSnackbar from '@/composables/use-snackbar'
import PageHeading from '@/components/PageHeading.vue'
import Subheading from '@/components/Subheading.vue'
import NProgress from 'nprogress'
import { SET_USER } from '@/store/mutation-types'

export default defineComponent({
  name: 'SettingsPage',
  components: {
    AppSwitch,
    AppPanel,
    AppButton,
    AppLabel,
    AppModal,
    SettingsItem,
    TrashIcon,
    PageHeading,
    Subheading
  },
  setup() {
    const { theme, isSystemTheme, setTheme } = useTheme()
    const { setSnackbarMessage } = useSnackbar()

    const deactivateAccountModal = ref(false)

    return {
      theme,
      isSystemTheme,
      setTheme,
      setSnackbarMessage,
      deactivateAccountModal
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
      this.deactivateAccountModal = false
      try {
        NProgress.start()
        await userService.deactivateAccount()
        this.$store.commit(SET_USER, null)
        localStorage.clear()
        await this.$router.push('/login')
        this.setSnackbarMessage('Account deactivated.', 'success')
      } catch (error) {
        console.log(error)
        this.setSnackbarMessage('Could not deactivate account.', 'error')
      } finally {
        NProgress.done()
      }
    }
  }
})
</script>
