<template>
  <AppButton v-bind="$attrs" id="btn-open" @click="modal = true" prominent>
    Add External Link
  </AppButton>
  <teleport to="#modals">
    <AppModal v-model="modal" class="w-[90%] sm:w-2/4">
      <template #header>Add external link</template>
      <template #body>
        <p>Links added will be pinned at the top of the overview tab.</p>
        <section class="mt-4 space-y-4">
          <div>
            <label for="title"><AppLabel>Title</AppLabel></label>
            <AppInput
              id="title"
              class="
                w-full
                mt-1
                text-gray-900
                dark:text-white
                dark:bg-transparent
                dark:border-gray-600
              "
              v-model="title"
              type="text"
              placeholder="Virtual Meeting"
            />
          </div>
          <div>
            <label for="url"><AppLabel>URL</AppLabel></label>
            <AppInput
              id="url"
              class="
                w-full
                mt-1
                text-gray-900
                dark:text-white
                dark:bg-transparent
                dark:border-gray-600
              "
              v-model="url"
              type="text"
              placeholder="https://zoom.us/j/2706212085"
            />
          </div>
          <div>
            <label for="description"><AppLabel>Description</AppLabel></label>
            <AppInput
              id="description"
              class="
                w-full
                mt-1
                text-gray-900
                dark:text-white
                dark:bg-transparent
                dark:border-gray-600
              "
              v-model="description"
              type="text"
              placeholder="Every Monday at 4:00 PM"
            />
          </div>
        </section>
      </template>
      <template #action>
        <AppButton @click="handleClick" prominent :disabled="!fieldsFilled">
          Add
        </AppButton>
      </template>
    </AppModal>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from './ui/AppInput.vue'
import AppLabel from './ui/AppLabel.vue'

export default defineComponent({
  name: 'AddExternalLinkModal',
  components: { AppButton, AppModal, AppInput, AppLabel },
  inheritAttrs: false,
  emits: ['add'],
  setup(_, { emit }) {
    const modal = ref(false)

    const title = ref('')
    const url = ref('')
    const description = ref('')

    const fieldsFilled = computed(() => {
      return title.value !== '' && url.value !== ''
    })

    const handleClick = () => {
      emit('add', {
        title: title.value,
        url: url.value,
        description: description.value
      })
      title.value = ''
      url.value = ''
      description.value = ''
      modal.value = false
    }

    return {
      modal,
      title,
      url,
      description,
      fieldsFilled,
      handleClick
    }
  }
})
</script>
