<template>
  <Center v-once>
    <div class="flex flex-col items-center">
      <AppLogo class="h-10" />
      <EmptyState class="py-10">
        <template #icon>
          <ExclamationCircleIcon />
        </template>
        <template #content> Sorry, that page cannot be found. </template>
      </EmptyState>
      <AppButton class="mt-3" @click="$router.push('/')" prominent
        >Go Home</AppButton
      >
    </div>
  </Center>
</template>

<script lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import Center from '@/components/Center.vue'
import { defineComponent } from 'vue'
import EmptyState from '@/components/EmptyState.vue'
import { ExclamationCircleIcon } from '@heroicons/vue/outline'
import AppLogo from '@/components/AppLogo.vue'

export default defineComponent({
  name: 'NotFound',
  components: { AppButton, Center, EmptyState, ExclamationCircleIcon, AppLogo }
})
</script>
