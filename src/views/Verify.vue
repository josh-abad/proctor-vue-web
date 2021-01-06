<template>
  <div>
    <Center>
      <div class="flex flex-col items-center">
        <div>
          <img
            :src="require(`@/assets/${logoFilename}`)"
            alt="Logo"
            class="h-10"
          />
        </div>
        <div class="mt-4 font-bold text-xl">
          {{ message }}
        </div>
      </div>
    </Center>
  </div>
</template>

<script lang="ts">
import Center from '@/components/Center.vue'
import { VERIFY } from '@/store/action-types'
import { defineComponent } from 'vue'
import logoMixin from '@/mixins/logo'

export default defineComponent({
  components: { Center },
  name: 'Verify',
  mixins: [logoMixin],
  data () {
    return {
      message: 'Verifying...',
      success: false
    }
  },
  props: {
    token: {
      type: String,
      required: true
    }
  },
  async mounted (): Promise<void> {
    try {
      await this.$store.dispatch(VERIFY, this.token)
      this.success = true
      this.message = 'Verification successful'
    } catch (error) {
      this.message = error.response.data.error
    }
  }
})
</script>
