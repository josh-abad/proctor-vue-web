<template>
  <div>
    <Suspense>
      <template #default>
        <div>
          <Default :course-id="courseId" />
        </div>
      </template>
      <template #fallback>
        <Fallback />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Default from './components/Default.vue'
import Fallback from './components/fallback/Fallback.vue'

export default defineComponent({
  name: 'CourseOverview',
  components: {
    Fallback,
    Default
  },
  props: {
    courseId: {
      type: String,
      required: true
    }
  }
})
</script>
