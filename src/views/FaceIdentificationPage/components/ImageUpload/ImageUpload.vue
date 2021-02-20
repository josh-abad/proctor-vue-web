<template>
  <div>
    <div class="flex">
      <div v-if="previewImage" class="mr-4">
        <AppLabel emphasis>New</AppLabel>
        <Preview :src="previewImage" />
      </div>
      <div
        class="ease-in-out duration-300 transform"
        :class="{ 'opacity-50 scale-95': validImage }"
      >
        <AppLabel emphasis>Current</AppLabel>
        <Preview
          v-if="user?.referenceImageUrl"
          :src="user?.referenceImageUrl"
        />
        <div v-else>
          <div class="w-56 h-56 bg-dark-06 rounded-lg">
            <div
              class="flex items-center justify-center h-full text-gray-500 font-semibold uppercase tracking-wider"
            >
              No image
            </div>
          </div>
        </div>
      </div>
    </div>
    <Feedback
      class="mt-2"
      :class="{ 'opacity-0': !image }"
      :valid="validImage"
      :loading="loading"
    />
    <form method="post" enctype="multipart/form-data" class="mt-2">
      <div class="flex justify-between items-end">
        <label
          class="cursor-pointer border border-green-500 text-green-500 hover:text-white hover:bg-green-500 flex flex-col px-4 py-2 items-center rounded-lg focus:outline-none"
        >
          <!-- Heroicon name: photograph -->
          <svg
            class="fill-current w-5 h-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm">Select Image</span>
          <input
            type="file"
            name="image"
            accept=".jpg,.jpeg,.png"
            class="hidden"
            @change="handleChange"
          />
        </label>
        <AppButton
          class="mt-2"
          @click.prevent="handleSubmit"
          :disabled="!(image && validImage)"
          type="submit"
          prominent
          >Confirm</AppButton
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import usersService from '@/services/users'
import { SET_USER } from '@/store/mutation-types'
import { defineComponent } from 'vue'
import userMixin from '@/mixins/user'
import AppButton from '@/components/ui/AppButton.vue'
import * as faceapi from 'face-api.js'
import { TinyFaceDetectorOptions } from 'face-api.js'
import Feedback from './components/Feedback.vue'
import Preview from './components/Preview.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import nProgress from 'nprogress'

const MODELS_URL = '/models'

export default defineComponent({
  name: 'ImageUpload',
  components: { AppButton, Feedback, Preview, AppLabel },
  mixins: [userMixin],
  data () {
    return {
      image: null as File | null,
      previewImage: null as string | null,
      validImage: false,
      loading: false
    }
  },
  async mounted (): Promise<void> {
    try {
      await faceapi.loadTinyFaceDetectorModel(MODELS_URL)
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async handleSubmit (): Promise<void> {
      if (!this.user) return
      const { token, id } = this.user

      if (!this.image) return
      const data = new FormData()
      data.append('image', this.image)

      nProgress.start()
      const updatedUser = await usersService.uploadImage(id, data)
      nProgress.done()
      this.$store.commit(SET_USER, { token, ...updatedUser })
      this.previewImage = null
      this.image = null
      this.validImage = false
    },
    async handleChange (event: Event): Promise<void> {
      this.loading = true
      this.image = (event.target as HTMLInputElement).files?.[0] || null
      if (this.image) {
        const reader = new FileReader()
        reader.readAsDataURL(this.image)
        reader.addEventListener('load', async (e) => {
          this.previewImage = e.target?.result as string

          const input = await faceapi.fetchImage(this.previewImage)
          const options = new TinyFaceDetectorOptions()
          try {
            const detection = await faceapi.detectSingleFace(input, options)
            this.loading = false
            this.validImage = !!detection
          } catch (error) {
            console.log(error)
          }
        })
      }
    }
  }
})
</script>
