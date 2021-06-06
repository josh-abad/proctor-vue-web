<template>
  <div class="flex items-center justify-between py-3">
    <div class="flex items-center">
      <UserCircleIcon class="w-10 h-10 text-gray-400" />
      <div class="ml-4">
        <router-link :to="`/user/${student.id}`">{{
          student.fullName
        }}</router-link>
      </div>
    </div>
    <button
      class="relative focus:outline-none"
      @click="menuDropdown.toggle"
      id="dropdown-toggle"
    >
      <DotsVerticalIcon class="w-6 h-6 pointer-events-none fill-current" />
      <MenuDropdown
        class="mr-8 -mt-6"
        v-show="menuDropdown.isOpen"
        @click-outside="menuDropdown.close"
      >
        <MenuDropdownItem :path="`/user/${student.id}`">
          <template #label> View Student </template>
        </MenuDropdownItem>
        <MenuDropdownItem
          @item-click="unenrollStudentModal.open"
          separator
          v-if="
            courseId && $store.getters.permissions(['admin', 'coordinator'])
          "
        >
          <template #label>
            <span class="text-red-500 dark:text-red-400">
              Un-Enroll From Course
            </span>
          </template>
        </MenuDropdownItem>
        <MenuDropdownItem
          @item-click="deleteStudentModal.open"
          separator
          v-if="!courseId && $store.getters.permissions(['admin'])"
        >
          <template #label>
            <span class="text-red-500 dark:text-red-400">Delete Student</span>
          </template>
        </MenuDropdownItem>
      </MenuDropdown>
    </button>
    <teleport to="#modals">
      <AppModal
        :open="deleteStudentModal.isOpen"
        @close="deleteStudentModal.close"
      >
        <template #header> Delete Account </template>
        <template #body>
          Are you sure you want to delete this account?
        </template>
        <template #action>
          <AppButton @click="deleteStudent" prominent> Delete </AppButton>
        </template>
      </AppModal>
      <AppModal
        :open="unenrollStudentModal.isOpen"
        @close="unenrollStudentModal.close"
      >
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
import { User } from '@/types'
import { defineComponent, PropType } from 'vue'
import MenuDropdown from './MenuDropdown.vue'
import MenuDropdownItem from './MenuDropdownItem.vue'
import AppButton from './ui/AppButton.vue'
import { UserCircleIcon } from '@heroicons/vue/solid'
import AppModal from './ui/AppModal.vue'
import courses from '@/services/courses'
import { DotsVerticalIcon } from '@heroicons/vue/outline'
import useSnackbar from '@/composables/use-snackbar'
import useModal from '@/composables/use-modal'

export default defineComponent({
  name: 'StudentRow',
  components: {
    AppButton,
    AppModal,
    MenuDropdown,
    MenuDropdownItem,
    UserCircleIcon,
    DotsVerticalIcon
  },
  props: {
    student: {
      type: Object as PropType<User>,
      required: true
    },

    courseId: {
      type: String,
      required: false
    }
  },
  emit: ['delete-student'],
  setup() {
    const { setSnackbarMessage } = useSnackbar()

    const deleteStudentModal = useModal()
    const unenrollStudentModal = useModal()
    const menuDropdown = useModal()

    return {
      setSnackbarMessage,
      deleteStudentModal,
      unenrollStudentModal,
      menuDropdown
    }
  },
  methods: {
    async deleteStudent() {
      this.deleteStudentModal.close()
      try {
        await usersService.deleteUser(this.student.id)
        this.setSnackbarMessage('Student removed', 'success')
        this.$emit('delete-student')
      } catch (error) {
        this.setSnackbarMessage('Could not delete student.', 'error')
      }
    },
    async unenrollStudent() {
      this.unenrollStudentModal.close()
      if (this.courseId) {
        try {
          await courses.unenrollUser(this.courseId, this.student.id)
          this.setSnackbarMessage('Student un-enrolled from course.', 'success')
          this.$emit('delete-student')
        } catch (error) {
          this.setSnackbarMessage('Could not un-enroll student.', 'error')
        }
      }
    }
  }
})
</script>
