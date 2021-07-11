<template>
  <div>
    <a :href="externalLink.url" target="_blank" class="flex items-center">
      <VideoCameraIcon v-if="isMeetingLink" class="w-5 h-5" />
      <ExternalLinkIcon v-else class="w-5 h-5" />
      <span class="ml-4">{{ externalLink.title }}</span>
    </a>
    <p
      class="ml-9 text-xs font-medium text-gray-600 dark:text-gray-400"
      v-if="externalLink.description"
    >
      {{ externalLink.description }}
    </p>
  </div>
</template>

<script lang="ts">
import { ExternalLink } from '@/types'
import { computed, defineComponent, PropType } from 'vue'
import { ExternalLinkIcon, VideoCameraIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'ExternalLinkItem',
  components: { ExternalLinkIcon, VideoCameraIcon },
  props: {
    externalLink: {
      type: Object as PropType<ExternalLink>,
      required: true
    }
  },
  setup(props) {
    const isZoomLink = computed(() => {
      const zoomRegex =
        /^(?:https?:\/\/)?(?:([a-zA-Z][a-zA-Z0-9.]{4,39})\.)?zoom\.us\/j\/(\d{10})$/
      return zoomRegex.test(props.externalLink.url)
    })

    const isGoogleMeetLink = computed(() => {
      const googleMeetRegex =
        /^(?:https?:\/\/)?meet\.google\.com\/[a-zA-Z]{3}-[a-zA-Z]{4}-[a-zA-Z]{3}$/
      return googleMeetRegex.test(props.externalLink.url)
    })

    const isMeetingLink = computed(() => {
      return isZoomLink.value || isGoogleMeetLink.value
    })

    return {
      isMeetingLink
    }
  }
})
</script>
