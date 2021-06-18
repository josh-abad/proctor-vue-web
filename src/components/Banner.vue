<template>
  <div class="sticky top-0 z-20 w-full bg-green-600 h-14" v-show="modelValue">
    <div class="px-3 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center justify-between">
        <div class="flex items-center flex-1 w-0">
          <span class="flex p-2 bg-green-800 rounded-lg">
            <SpeakerphoneIcon class="w-6 h-6 text-white" />
          </span>
          <p class="ml-3 font-medium text-white truncate">
            Welcome to Proctor Vue! Setup face identification to get started.
          </p>
        </div>
        <div class="flex-shrink-0 order-2 w-auto mt-0">
          <span @click="$emit('update:modelValue', false)">
            <router-link to="/settings/face-id">
              Setup face identification
            </router-link>
          </span>
        </div>
        <div class="flex-shrink-0 order-3 ml-3">
          <button type="button" @click="$emit('update:modelValue', false)">
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

<style lang="postcss" scoped>
a {
  @apply flex items-center justify-center px-4 py-2 text-sm font-medium text-green-600 bg-white border border-transparent rounded-md shadow-sm hover:bg-green-50;
}

button {
  @apply flex p-2 -mr-1 rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2;
}
</style>
