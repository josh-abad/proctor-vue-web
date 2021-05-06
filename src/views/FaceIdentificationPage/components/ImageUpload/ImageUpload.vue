<template>
  <div>
    <div class="flex">
      <div v-if="previewImage" class="mr-4">
        <AppLabel emphasis>New</AppLabel>
        <Preview :src="previewImage" />
      </div>
      <div
        class="duration-300 ease-in-out transform"
        :class="{ 'opacity-50 scale-95': validImage }"
      >
        <AppLabel emphasis>Current</AppLabel>
        <Preview
          v-if="$store.state.user?.referenceImageUrl"
          :src="$store.state.user.referenceImageUrl"
        />
        <div v-else>
          <div class="w-56 h-56 bg-gray-700 rounded-lg">
            <div
              class="flex items-center justify-center h-full font-semibold tracking-wider text-gray-500 uppercase"
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
      <div class="flex items-end justify-between">
        <label
          class="flex flex-col items-center px-4 py-2 text-green-500 border border-green-500 rounded-lg cursor-pointer hover:text-white hover:bg-green-500 focus:outline-none"
        >
          <PhotographIcon class="w-5 h-5 fill-current" />
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
import AppButton from '@/components/ui/AppButton.vue'
import * as faceapi from 'face-api.js'
import { TinyFaceDetectorOptions } from 'face-api.js'
import Feedback from './components/Feedback.vue'
import Preview from './components/Preview.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import { PhotographIcon } from '@heroicons/vue/solid'
import useSnackbar from '@/composables/use-snackbar'

const MODELS_URL = '/models'

export default defineComponent({
  name: 'ImageUpload',
  components: { AppButton, Feedback, Preview, AppLabel, PhotographIcon },
  setup () {
    const { setSnackbarMessage } = useSnackbar()

    return {
      setSnackbarMessage
    }
  },
  data () {
    return {
      image: null as File | null,
      previewImage: null as string | null,
      validImage: false,
      loading: false
    }
  },
  async mounted () {
    try {
      await faceapi.loadTinyFaceDetectorModel(MODELS_URL)
    } catch (error) {
      this.setSnackbarMessage('Could not load face detection.')
    }
  },
  methods: {
    async handleSubmit () {
      if (!this.$store.state.user) return
      const { token, id } = this.$store.state.user

      if (!this.image) return
      const data = new FormData()
      data.append('image', this.image)

      const updatedUser = await usersService.uploadImage(id, data)
      this.$store.commit(SET_USER, { token, ...updatedUser })
      this.previewImage = null
      this.image = null
      this.validImage = false
    },
    async handleChange (event: Event) {
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
            this.setSnackbarMessage('Something went wrong.')
          }
        })
      }
    }
  }
})
</script>
