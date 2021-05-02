<template>
  <div class="p-4">
    <div v-if="exam">
      <PageHeader
        :links="links"
        @menu-clicked="menuOpen = !menuOpen"
        :hide-menu="!$store.getters.permissions(['coordinator', 'admin'])"
      >
        <template #label>{{ exam.label }}</template>
        <template #menu>
          <MenuDropdown
            class="mt-2 mr-2"
            v-show="menuOpen"
            @click-outside="menuOpen = false"
          >
            <MenuDropdownItem id="btn-open" @item-click="modalOpen = true">
              <template #label>Delete Exam</template>
            </MenuDropdownItem>
          </MenuDropdown>
        </template>
      </PageHeader>
      <teleport to="#modals">
        <AppModal :open="modalOpen" @close="modalOpen = false">
          <template #header>Delete Quiz</template>
          <template #body>Are you sure you want to delete this quiz?</template>
          <template #action>
            <AppButton @click="deleteExam" prominent> Delete </AppButton>
          </template>
        </AppModal>
      </teleport>
      <AppPanel class="mt-4">
        <div class="text-gray-600 dark:text-gray-400">
          <div v-if="highestGrade">
            Your highest score for this quiz is {{ highestGrade }}.
          </div>
          <div>
            {{ displayAttemptsLeft }}
          </div>
          <div v-show="attemptsLeft > 0" class="inline-flex items-center">
            <ClockIcon class="w-5 h-5 mr-2" />
            The quiz will end {{ duration }}.
          </div>
        </div>
        <div v-if="locked !== 0">
          <div v-if="locked === -1">
            The exam will not be available until {{ formattedStartDate }} from
            now.
          </div>
          <div v-else>The exam was closed {{ formattedEndDate }} ago.</div>
        </div>
        <div v-if="!$store.state.user?.referenceImageUrl" class="inline-flex items-center">
          <ExclamationCircleIcon class="w-5 h-5 mr-2" />
          <div>
            Please set up
            <router-link
              :to="`/user/${$store.state.user?.id}/reference-image`"
              class="text-green-400"
            >
              Face Identification
            </router-link>
            in order to proceed with the exam.
          </div>
        </div>
        <div v-else-if="attemptsByExam.length > 0" class="mt-4">
          <AppLabel emphasis>Previous Attempts</AppLabel>
          <div class="mt-2 overflow-hidden rounded-xl separator-y">
            <AttemptItem
              v-for="(attempt, i) in attemptsByExam"
              :key="attempt.id"
              :attempt-number="i + 1"
              :attempt="attempt"
              @review-clicked="
                $router.push(
                  `/courses/${courseId}/exams/${examId}/${attempt.id}`
                )
              "
            />
          </div>
        </div>
        <div v-else>You have made no attempts so far.</div>
        <div class="flex flex-row-reverse justify-between mt-4">
          <ModalButton
            v-if="locked === 0 && attemptsLeft > 0 && $store.state.user?.referenceImageUrl"
            header="Attempt Quiz"
            message="Are you sure you want to start the quiz?"
            action-label="Start Quiz"
            @confirm="startAttempt"
            prominent
          >
            {{ attemptsByExam.length > 0 ? "Re-attempt quiz" : "Attempt quiz" }}
          </ModalButton>
          <AppButton
            v-if="locked !== 0"
            @click="$router.push(`/courses/${courseId}`)"
            prominent
          >
            Back to the Course
          </AppButton>
        </div>
      </AppPanel>
    </div>
  </div>
</template>

<script lang="ts">
import AttemptItem from './components/AttemptItem.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import examAttemptsService from '@/services/exam-attempts'
import examResultsService from '@/services/exam-results'
import { ALERT, DELETE_EXAM } from '@/store/action-types'
import { ADD_ATTEMPT, SET_ACTIVE_EXAM } from '@/store/mutation-types'
import { Attempt, Exam, Link } from '@/types'
import { defineComponent } from 'vue'
import ModalButton from '@/components/ui/ModalButton.vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import AppButton from '@/components/ui/AppButton.vue'
import relativeTime from 'dayjs/plugin/relativeTime'
import MenuDropdown from '@/components/MenuDropdown.vue'
import MenuDropdownItem from '@/components/MenuDropdownItem.vue'
import AppModal from '@/components/ui/AppModal.vue'
import { ClockIcon, ExclamationCircleIcon } from '@heroicons/vue/solid'
import { isExamLocked } from '@/utils/helper'

dayjs.extend(relativeTime)
dayjs.extend(duration)

export default defineComponent({
  name: 'AttemptsPage',
  components: {
    AttemptItem,
    AppPanel,
    AppLabel,
    PageHeader,
    ModalButton,
    AppButton,
    MenuDropdown,
    MenuDropdownItem,
    AppModal,
    ClockIcon,
    ExclamationCircleIcon
  },
  props: {
    courseId: {
      type: String,
      required: true
    },

    examId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      menuOpen: false,
      modalOpen: false
    }
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
          name: this.exam ? this.exam.course.name : '',
          url: `/courses/${this.courseId}`
        },
        {
          name: this.exam ? this.exam.label : '',
          url: `/courses/${this.courseId}/exams/${this.examId}`
        }
      ]
    },
    exam (): Exam | undefined {
      return this.$store.getters.examByID(this.examId)
    },
    locked (): number {
      return this.exam ? isExamLocked(this.exam) : 0
    },
    attemptsByUser (): Attempt[] {
      if (!this.$store.state.user) {
        return []
      }
      return this.$store.getters.attemptsByUser(this.$store.state.user.id)
    },
    attemptsByExam (): Attempt[] {
      return this.attemptsByUser.filter(attempt => !!attempt.exam && attempt.exam.id === this.examId)
    },
    attemptsLeft (): number {
      return this.exam ? this.exam.maxAttempts - this.attemptsByExam.length : 0
    },
    displayAttemptsLeft (): string {
      return `You have ${this.attemptsLeft} ${this.attemptsLeft === 1 ? 'attempt' : 'attempts'} left.`
    },
    highestGrade (): number {
      return this.attemptsByExam.reduce((a, b) => Math.max(a, b.score), 0)
    },
    duration (): string {
      return this.exam ? dayjs.duration({ seconds: this.exam.duration }).humanize(true) : ''
    },
    formattedStartDate (): string {
      return this.exam ? dayjs(this.exam.startDate).fromNow(true) : ''
    },
    formattedEndDate (): string {
      return this.exam ? dayjs(this.exam.endDate).toNow(true) : ''
    }
  },
  methods: {
    async startAttempt () {
      try {
        const response = await examAttemptsService.start(this.examId)
        this.$store.commit(ADD_ATTEMPT, response.attempt)
        localStorage.setItem('activeExam', JSON.stringify(response))
        examResultsService.setToken(response.token)
        this.$store.commit(SET_ACTIVE_EXAM, response.attempt.exam.id)
        this.$router.push(
          `/courses/${this.courseId}/exams/${this.examId}/${response.attempt.id}`
        )
      } catch (error) {
        this.$store.dispatch(ALERT, 'Attempt could not be started')
      }
    },
    async deleteExam () {
      await this.$store.dispatch(DELETE_EXAM, this.examId)
      this.$router.push(`/courses/${this.courseId}`)
    }
  }
})
</script>
