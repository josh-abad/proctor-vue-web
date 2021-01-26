<template>
  <div class="p-4">
    <BasePanel>
      <div class="font-bold text-xl">Face Identification</div>
      <div class="text-gray-400 text-sm">
        Please upload a picture of your face. This image will only be used to
        identify you during exams.
      </div>
      <ImageUpload class="mt-4" />
    </BasePanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ImageUpload from '@/components/ImageUpload.vue'
import BasePanel from '@/components/BasePanel.vue'

export default defineComponent({
  name: 'UploadReferenceImage',
  components: { ImageUpload, BasePanel },
  props: {
    userId: {
      type: String,
      required: true
    }
  }
})
</script>
