<template>
  <div
    class="sticky top-0 z-20 w-full h-14 bg-green-600"
    v-show="modelValue"
    role="banner"
  >
    <div class="py-2 px-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex flex-1 items-center w-0">
          <span class="flex p-2 bg-green-800 rounded-lg">
            <SpeakerphoneIcon class="w-6 h-6 text-white" />
          </span>
          <p class="ml-3 font-medium text-white truncate">
            Welcome to Proctor Vue! Setup face identification to get started.
          </p>
        </div>
        <div class="flex-shrink-0 order-2 mt-0 w-auto">
          <span @click="$emit('update:modelValue', false)">
            <router-link
              to="/settings/face-id"
              class="
                flex
                justify-center
                items-center
                py-2
                px-4
                text-sm
                font-medium
                text-green-600
                bg-white
                rounded-md
                border border-transparent
                shadow-sm
                hover:bg-green-50
              "
            >
              Setup face identification
            </router-link>
          </span>
        </div>
        <div class="flex-shrink-0 order-3 ml-3">
          <button
            aria-label="Dismiss Banner"
            type="button"
            @click="$emit('update:modelValue', false)"
            class="
              flex
              p-2
              -mr-1
              rounded-md
              sm:-mr-2
              hover:bg-green-500
              focus:ring-2 focus:ring-white
              focus:outline-none
            "
          >
            <XIcon class="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SpeakerphoneIcon, XIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'TheAppBar',
  components: {
    SpeakerphoneIcon,
    XIcon
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue']
})
</script>
