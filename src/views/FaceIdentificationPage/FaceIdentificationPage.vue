<template>
  <div class="p-4">
    <PageHeading
      hide-menu
      :links="[
        { name: 'Home', url: '/' },
        { name: 'Settings', url: '/settings' }
      ]"
      ><template #label>Face Identification</template></PageHeading
    >
    <AppPanel class="mt-8">
      <div class="text-sm text-gray-400">
        Please upload a picture of your face. This image will only be used to
        identify you during exams.
      </div>
      <ImageUpload class="mt-4" />
    </AppPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ImageUpload from './components/ImageUpload/ImageUpload.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import PageHeading from '@/components/PageHeading.vue'

export default defineComponent({
  name: 'FaceIdentificationPage',
  components: { ImageUpload, AppPanel, PageHeading }
})
</script>
