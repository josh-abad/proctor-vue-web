<template>
  <div>
    <div class="text-xl">Upload Reference Image</div>
    <form method="post" enctype="multipart/form-data" class="mt-2">
      <input type="file" name="image" @change="handleChange" />
      <BaseButton
        v-if="image"
        @click.prevent="handleSubmit"
        type="submit"
        prominent
        >Upload</BaseButton
      >
    </form>
  </div>
</template>

<script lang="ts">
import usersService from '@/services/users'
import { SET_USER } from '@/store/mutation-types'
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'
import BaseButton from './BaseButton.vue'

export default defineComponent({
  name: 'ImageUpload',
  components: { BaseButton },
  mixins: [userMixin],
  data () {
    return {
      image: null as File | null
    }
  },
  methods: {
    async handleSubmit (): Promise<void> {
      if (!this.user) return
      const { token, id } = this.user

      if (!this.image) return
      const data = new FormData()
      data.append('image', this.image)

      const updatedUser = await usersService.uploadImage(id, data)
      this.$store.commit(SET_USER, { token, ...updatedUser })
    },
    handleChange (event: Event): void {
      this.image = (event.target as HTMLInputElement).files?.[0] || null
    }
  }
})
</script>
