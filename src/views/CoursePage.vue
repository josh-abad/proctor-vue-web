<template>
  <div v-if="course">
    <ColorHeader :links="links">{{ course.name }}</ColorHeader>

    <div class="flex mt-4">
      <div class="flex-grow mr-4">
        <div
          v-if="$store.getters.permissions('coordinator', 'admin')"
          class="flex space-x-2 text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-t-lg shadow"
        >
          <router-link
            :to="`/courses/${courseId}`"
            class="px-4 py-2 text-center"
          >
            Overview
          </router-link>
          <router-link
            :to="`/courses/${courseId}/students`"
            class="px-4 py-2 text-center"
          >
            Students
          </router-link>
        </div>
        <BasePanel class="rounded-t-none pt-2 overflow-hidden">
          <router-view v-slot="{ Component, route }" class="rounded-t-none">
            <transition :name="route.meta.transition || 'fade'" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </BasePanel>
      </div>
      <div class="w-72">
        <AboutCourse
          :studentCount="course.studentsEnrolled.length"
          :description="course.description"
          :coordinatorName="coordinatorName"
        />
        <BasePanel v-if="$store.getters.permissions('admin')" class="mt-4">
          <BaseLabel emphasis>Admin options</BaseLabel>
          <div class="mt-2">
            <div>
              <BaseButton class="w-full" @click="editCourse"
                >Edit Course</BaseButton
              >
            </div>
            <div class="mt-2">
              <BaseButton class="w-full" @click="deleteCourse"
                >Delete Course</BaseButton
              >
            </div>
          </div>
        </BasePanel>
        <BasePanel
          v-if="$store.getters.permissions('coordinator', 'admin')"
          class="mt-4"
        >
          <BaseLabel emphasis>Coordinator options</BaseLabel>
          <div class="mt-2">
            <div>
              <BaseButton
                class="w-full"
                @click="$router.push(`/courses/${courseId}/exams/new`)"
                >Create Exam</BaseButton
              >
            </div>
            <div class="mt-2">
              <BaseButton
                class="w-full"
                @click="$router.push(`/courses/${courseId}/students`)"
                >View Students</BaseButton
              >
            </div>
          </div>
        </BasePanel>
      </div>
    </div>
    <div class="mt-4" v-show="userRole === 'coordinator'"></div>
  </div>
  <Center v-else>
    <div class="flex flex-col items-center">
      <p class="font-thin text-2xl">Sorry, that course cannot be found.</p>
      <BaseButton class="mt-3" @click="$router.push('/courses')" prominent
        >Go to courses</BaseButton
      >
    </div>
  </Center>
</template>

<script lang="ts">
import AboutCourse from '@/components/AboutCourse.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import Center from '@/components/Center.vue'
import ColorHeader from '@/components/ColorHeader.vue'
import { DELETE_COURSE } from '@/store/action-types'
import { ADD_RECENT_COURSE, DISPLAY_DIALOG } from '@/store/mutation-types'
import { Course, DialogContent, Link, Role } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseButton, BasePanel, Center, BaseLabel, ColorHeader, AboutCourse },
  name: 'CoursePage',
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  mounted () {
    document.title = this.course ? `${this.course.name} | Proctor Vue` : 'Course Not Found | Proctor Vue'
    this.$store.commit(ADD_RECENT_COURSE, this.courseId)
  },
  computed: {
    links (): Link[] {
      return [
        {
          name: 'Home',
          url: '/'
        },
        {
          name: 'Courses',
          url: '/courses'
        },
        {
          name: this.course.name,
          url: `/courses/${this.courseId}`
        }
      ]
    },
    course (): Course {
      return this.$store.getters.getCourseByID(this.courseId)
    },
    coordinatorName (): string {
      if (this.course.coordinator) {
        const { first, last } = this.course.coordinator.name
        return `${first} ${last}`
      }
      return ''
    },
    userRole (): Role {
      return this.$store.getters.userRole
    }
  },
  methods: {
    deleteCourse (): void {
      const dialogContent: Omit<DialogContent, 'closed'> = {
        header: 'Delete Course',
        message: 'Are you sure you want to delete this course?',
        actionLabel: 'Delete'
      }
      this.$store.commit(DISPLAY_DIALOG, dialogContent)

      this.$emitter.on('closedDialog', (confirmDelete: boolean) => {
        if (confirmDelete) {
          this.$store.dispatch(DELETE_COURSE, this.courseId)
          this.$router.push('/courses')
        }
        this.$emitter.all.clear()
      })
    },
    editCourse (): void {
      console.log('edited course')
    }
  }
})
</script>

<style lang="postcss" scoped>
.router-link-active {
  @apply rounded-t-lg font-semibold bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-b-2 border-green-500;
}

.slide-left-enter-active,
.slide-right-enter-active {
  @apply transition-all duration-300 ease-out;
}

.slide-left-leave-active,
.slide-right-leave-active {
  @apply transition-all duration-300 ease-in;
}

.slide-left-enter-from,
.slide-right-leave-to {
  @apply transform-gpu translate-x-40 opacity-0;
}

.slide-left-enter-to,
.slide-right-leave-from,
.slide-right-enter-to,
.slide-left-leave-from {
  @apply transform-gpu translate-x-0 opacity-100;
}

.slide-right-enter-from,
.slide-left-leave-to {
  @apply transform-gpu -translate-x-5 opacity-0;
}
</style>
