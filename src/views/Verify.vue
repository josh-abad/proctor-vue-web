<template>
  <Center>
    <div class="flex flex-col items-center">
      <div>
        <img
          :src="require(`@/assets/${logoFilename}`)"
          alt="Logo"
          class="h-10"
        />
      </div>
      <div class="mt-4 font-semibold text-xl">
        {{ message }}
      </div>
      <div class="mt-4">
        <div v-if="$store.state.user">
          <router-link to="/"
            ><BaseButton prominent>Go Home</BaseButton></router-link
          >
        </div>
        <div v-else>
          <router-link to="/login"
            ><BaseButton prominent>Log In</BaseButton></router-link
          >
        </div>
      </div>
    </div>
  </Center>
</template>

<script lang="ts">
import Center from '@/components/Center.vue'
import { defineComponent } from 'vue'
import logoMixin from '@/mixins/logo'
import BaseButton from '@/components/BaseButton.vue'
import verifyService from '@/services/verify'
import { SET_VERIFIED } from '@/store/mutation-types'

export default defineComponent({
  name: 'Verify',
  components: { Center, BaseButton },
  mixins: [logoMixin],
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
  async mounted (): Promise<void> {
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
