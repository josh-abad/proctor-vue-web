<template>
  <Center>
    <div class="flex flex-col items-center">
      <div>
        <AppLogo class="h-10" />
      </div>
      <div class="mt-4 text-xl font-semibold">
        {{ message }}
      </div>
      <div class="mt-4">
        <div v-if="$store.state.user">
          <router-link to="/"
            ><AppButton prominent>Go Home</AppButton></router-link
          >
        </div>
        <div v-else>
          <router-link to="/login"
            ><AppButton prominent>Log In</AppButton></router-link
          >
        </div>
      </div>
    </div>
  </Center>
</template>

<script lang="ts">
import Center from '@/components/Center.vue'
import { defineComponent } from 'vue'
import AppButton from '@/components/ui/AppButton.vue'
import verifyService from '@/services/verify'
import { SET_VERIFIED } from '@/store/mutation-types'
import AppLogo from '@/components/AppLogo.vue'

export default defineComponent({
  name: 'Verify',
  components: { Center, AppButton, AppLogo },
  data () {
    return {
      message: 'Verifying...',
      success: false
    }
  },
  props: {
    base64Token: {
      type: String,
      required: true
    }
  },
  async mounted () {
    const token = Buffer.from(this.base64Token, 'base64').toString('binary')
    try {
      const verifiedUser = await verifyService.verify(token)
      this.$store.commit(SET_VERIFIED, verifiedUser.id)
      this.message = 'Verification successful'
    } catch (error) {
      this.message = error.response.data.error
    }
  }
})
</script>
