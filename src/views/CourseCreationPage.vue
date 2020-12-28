<template>
  <div class="px-5 py-5 bg-gray-100 dark:bg-gray-800 rounded-lg">
    <div>Create New Course</div>
    <div class="flex flex-col items-start">
      <div class="mt-4">
        <label>
          <BaseLabel emphasis>Course name</BaseLabel>
          <BaseInput v-model="courseName" type="text" />
        </label>
      </div>
      <div class="mt-3">
        <label>
          <BaseLabel emphasis>Course description</BaseLabel>
          <BaseTextArea v-model="courseDescription" />
        </label>
      </div>
      <div class="mt-2">
        <label>
          <BaseLabel emphasis>Coordinator</BaseLabel>
          <BaseDropdown v-model="coordinator" :options="coordinators" />
        </label>
      </div>
    </div>
    <div class="mt-4">
      <BaseButton @click="saveCourse" prominent>Create</BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseDropdown from '@/components/BaseDropdown.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BaseTextArea from '@/components/BaseTextArea.vue'
import { CREATE_COURSE } from '@/store/action-types'
import { NewCourse, Option, User } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CourseCreationPage',
  components: { BaseInput, BaseButton, BaseTextArea, BaseDropdown, BaseLabel },
  data () {
    return {
      courseName: '',
      courseDescription: '',
      coordinator: ''
    }
  },
  computed: {
    coordinators (): Option[] {
      return this.$store.getters.coordinators.map((c: User) => {
        return { text: `${c.name.first} ${c.name.last}`, value: c.id }
      })
    }
  },
  methods: {
    async saveCourse (): Promise<void> {
      const newCourse: NewCourse = {
        name: this.courseName,
        coordinatorId: this.coordinator
      }
      await this.$store.dispatch(CREATE_COURSE, newCourse)
      this.$router.push('/courses')
    }
  }
})
</script>

<style lang="postcss" scoped>
.label,
.label-line {
  @apply uppercase text-xs dark:text-gray-400 font-semibold tracking-wide;
}

.label-line {
  @apply pb-1 border-b dark:border-gray-700;
}
</style>
