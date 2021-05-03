<template>
  <div
    class="flex items-center justify-between py-4 pl-2 pr-4 bg-white rounded-lg shadow-lg dark:bg-gray-700"
  >
    <div class="flex items-center">
      <img
        :src="student.avatarUrl"
        alt="Avatar"
        class="object-cover w-10 h-10 ml-2 rounded-full"
      />
      <div class="ml-4">
        <router-link :to="`/user/${student.id}`">{{
          student.fullName
        }}</router-link>
        <div class="text-sm text-gray-400" v-if="showCourseCount">
          Enrolled in {{ student.courses.length }}
          {{ student.courses.length === 1 ? "course" : "courses" }}
        </div>
      </div>
    </div>
    <button
      class="relative focus:outline-none"
      @click="menuOpen = !menuOpen"
      id="dropdown-toggle"
    >
      <DotsVerticalIcon class="w-6 h-6 pointer-events-none fill-current" />
      <MenuDropdown
        class="mr-8 -mt-6"
        v-show="menuOpen"
        @click-outside="menuOpen = false"
      >
        <MenuDropdownItem :path="`/user/${student.id}`">
          <template #label> View Student </template>
        </MenuDropdownItem>
        <MenuDropdownItem
          @item-click="unenrollModalOpen = true"
          separator
          v-if="courseId && $store.getters.permissions(['admin', 'coordinator'])"
        >
          <template #label>
            <span class="text-red-500">Un-Enroll From Course</span>
          </template>
        </MenuDropdownItem>
        <MenuDropdownItem
          @item-click="deleteModalOpen = true"
          separator
          v-if="!courseId && $store.getters.permissions(['admin'])"
        >
          <template #label>
            <span class="text-red-500">Delete Student</span>
          </template>
        </MenuDropdownItem>
      </MenuDropdown>
    </button>
    <teleport to="#modals">
      <AppModal :open="deleteModalOpen" @close="deleteModalOpen = false">
        <template #header> Delete Account </template>
        <template #body>
          Are you sure you want to delete this account?
        </template>
        <template #action>
          <AppButton @click="deleteStudent" prominent> Delete </AppButton>
        </template>
      </AppModal>
      <AppModal :open="unenrollModalOpen" @close="unenrollModalOpen = false">
        <template #header> Un-Enroll Student </template>
        <template #body>
          Are you sure you want to unenroll this student from this course?
        </template>
        <template #action>
          <AppButton @click="unenrollStudent" prominent> Un-enroll </AppButton>
        </template>
      </AppModal>
    </teleport>
  </div>
</template>

<script lang="ts">
import usersService from '@/services/users'
import { ALERT } from '@/store/action-types'
import { User } from '@/types'
import { defineComponent, PropType } from 'vue'
import MenuDropdown from './MenuDropdown.vue'
import MenuDropdownItem from './MenuDropdownItem.vue'
import AppButton from './ui/AppButton.vue'
import AppModal from './ui/AppModal.vue'
import courses from '@/services/courses'
import { DotsVerticalIcon } from '@heroicons/vue/outline'

export default defineComponent({
  name: 'StudentRow',
  components: {
    AppButton,
    AppModal,
    MenuDropdown,
    MenuDropdownItem,
    DotsVerticalIcon
  },
  props: {
    student: {
      type: Object as PropType<User>,
      required: true
    },

    showCourseCount: {
      type: Boolean,
      default: false
    },

    courseId: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      menuOpen: false,
      deleteModalOpen: false,
      unenrollModalOpen: false
    }
  },
  methods: {
    async deleteStudent () {
      this.deleteModalOpen = false
      try {
        await usersService.deleteUser(this.student.id)
        await this.$store.dispatch(ALERT, 'Student removed.')
      } catch (error) {
        await this.$store.dispatch(ALERT, 'Could not delete student.')
      }
    },
    async unenrollStudent () {
      this.unenrollModalOpen = false
      if (this.courseId) {
        try {
          await courses.unenrollUser(this.courseId, this.student.id)
          await this.$store.dispatch(ALERT, 'Student un-enrolled from course.')
        } catch (error) {
          await this.$store.dispatch(ALERT, 'Could not un-enroll student.')
        }
      }
    }
  }
})
</script>
