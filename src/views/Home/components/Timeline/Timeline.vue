<template>
  <AppPanel>
    <AppLabel class="pb-2 label-border" emphasis>Timeline</AppLabel>
    <Suspense>
      <template #default>
        <Items :user-id="user?.id ?? ''" />
      </template>
      <template #fallback>
        <SkeletonItems />
      </template>
    </Suspense>
  </AppPanel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import Items from './components/Items.vue'
import userMixin from '@/mixins/user'
import SkeletonItems from './components/SkeletonItems.vue'

export default defineComponent({
  name: 'Timeline',
  components: { AppPanel, AppLabel, Items, SkeletonItems },
  mixins: [userMixin]
})
</script>
