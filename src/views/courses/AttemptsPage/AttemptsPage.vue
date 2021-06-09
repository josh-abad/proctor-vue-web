<template>
  <div class="p-4">
    <transition name="fade" mode="out-in">
      <div v-if="errorLoadingExam"><ErrorLoading /></div>
      <div v-else-if="loadingExam">
        <AppSkeleton class="w-full h-28 rounded-xl" />
        <AppPanel class="mt-4">
          <AppSkeleton class="w-56 h-3" />
          <AppSkeleton class="w-40 h-3 mt-2" />
          <AppSkeleton class="w-56 h-3 mt-2" />
          <AppSkeleton class="h-3 mt-4 w-28" />
          <SkeletonAttemptsList />
          <div class="flex flex-row-reverse justify-between mt-4">
            <AppButton
              @click="$router.push(`/courses/${courseSlug}`)"
              prominent
            >
              Back to the Course
            </AppButton>
          </div>
        </AppPanel>
      </div>
      <div v-else-if="exam">
        <PageHeader
          :links="links"
          @menu-clicked="menuDropdown = !menuDropdown"
          :hide-menu="!$store.getters.permissions(['coordinator', 'admin'])"
        >
          <template #label>{{ exam.label }}</template>
          <template #menu>
            <MenuDropdown class="mt-2 mr-2" v-model="menuDropdown">
              <MenuDropdownItem
                id="btn-open"
                @item-click="deleteExamModal = true"
              >
                <template #label>Delete Exam</template>
              </MenuDropdownItem>
            </MenuDropdown>
          </template>
        </PageHeader>
        <teleport to="#modals">
          <AppModal v-model="deleteExamModal">
            <template #header>Delete Quiz</template>
            <template #body
              >Are you sure you want to delete this quiz?</template
            >
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
          <div
            v-if="!$store.state.user?.referenceImageUrl"
            class="inline-flex items-center"
          >
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
          <AppLabel class="mt-4" emphasis>Previous Attempts</AppLabel>
          <transition name="fade" mode="out-in">
            <div v-if="errorLoadingAttempts" class="mt-2">
              <ErrorLoading />
            </div>
            <SkeletonAttemptsList v-else-if="loadingAttempts" />
            <div v-else-if="attempts.length > 0">
              <ul class="mt-2 separator-y">
                <AttemptItem
                  v-for="(attempt, i) in attempts"
                  :key="attempt.id"
                  :attempt-number="i + 1"
                  :attempt="attempt"
                />
              </ul>
            </div>
            <div v-else>You have made no attempts so far.</div>
          </transition>
          <div class="flex flex-row-reverse justify-between mt-4">
            <ModalButton
              v-if="
                locked === 0 &&
                attemptsLeft > 0 &&
                $store.state.user?.referenceImageUrl
              "
              header="Attempt Quiz"
              message="Are you sure you want to start the quiz?"
              action-label="Start Quiz"
              @confirm="startAttempt"
              prominent
            >
              {{ attempts.length > 0 ? 'Re-attempt quiz' : 'Attempt quiz' }}
            </ModalButton>
            <AppButton
              v-if="locked !== 0"
              @click="$router.push(`/courses/${courseSlug}`)"
              prominent
            >
              Back to the Course
            </AppButton>
          </div>
        </AppPanel>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import AttemptItem from './components/AttemptItem.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import PageHeader from '@/components/PageHeader/PageHeader.vue'
import examAttemptsService from '@/services/exam-attempts'
import { DELETE_EXAM } from '@/store/action-types'
import { Link } from '@/types'
import { defineComponent, ref } from 'vue'
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
import useFetch from '@/composables/use-fetch'
import examsService from '@/services/exams'
import coursesService from '@/services/courses'
import { useStore } from '@/store'
import useSnackbar from '@/composables/use-snackbar'
import useTitle from '@/composables/use-title'
import ErrorLoading from '@/components/ui/ErrorLoading.vue'
import SkeletonAttemptsList from './components/SkeletonAttemptsList.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'

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
    ExclamationCircleIcon,
    ErrorLoading,
    SkeletonAttemptsList,
    AppSkeleton
  },
  props: {
    courseSlug: {
      type: String,
      required: true
    },

    examSlug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const store = useStore()
    const { setSnackbarMessage } = useSnackbar()

    const deleteExamModal = ref(false)

    const menuDropdown = ref(false)

    const [attempts, fetchAttempts, loadingAttempts, errorLoadingAttempts] =
      useFetch(
        () =>
          examsService.getAttemptsByUser(
            exam.value.id,
            store.state.user?.id ?? ''
          ),
        []
      )

    const [exam, fetchExam, loadingExam, errorLoadingExam] = useFetch(() =>
      coursesService.getExam(props.courseSlug, props.examSlug)
    )

    const { setTitle } = useTitle()

    fetchExam().then(() => {
      fetchAttempts()
      setTitle(`${exam.value.label} - Proctor Vue`)
    })

    return {
      exam,
      attempts,
      loadingAttempts,
      errorLoadingAttempts,
      loadingExam,
      errorLoadingExam,
      setSnackbarMessage,
      deleteExamModal,
      menuDropdown
    }
  },
  computed: {
    links(): Link[] {
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
          url: `/courses/${this.courseSlug}`
        },
        {
          name: this.exam ? this.exam.label : '',
          url: `/courses/${this.courseSlug}/${this.examSlug}`
        }
      ]
    },
    locked(): number {
      return this.exam ? isExamLocked(this.exam) : 0
    },
    attemptsLeft(): number {
      return this.exam ? this.exam.maxAttempts - this.attempts.length : 0
    },
    displayAttemptsLeft(): string {
      return `You have ${this.attemptsLeft} ${
        this.attemptsLeft === 1 ? 'attempt' : 'attempts'
      } left.`
    },
    highestGrade(): number {
      return this.attempts.reduce((a, b) => Math.max(a, b.score), 0)
    },
    duration(): string {
      return this.exam
        ? dayjs.duration({ seconds: this.exam.duration }).humanize(true)
        : ''
    },
    formattedStartDate(): string {
      return this.exam ? dayjs(this.exam.startDate).fromNow(true) : ''
    },
    formattedEndDate(): string {
      return this.exam ? dayjs(this.exam.endDate).toNow(true) : ''
    }
  },
  methods: {
    async startAttempt() {
      try {
        await examAttemptsService.start(this.exam.id)
        this.$router.push(
          `/courses/${this.courseSlug}/${this.examSlug}/attempt`
        )
      } catch (error) {
        this.setSnackbarMessage('Attempt could not be started', 'error')
      }
    },
    async deleteExam() {
      await this.$store.dispatch(DELETE_EXAM, this.exam.id)
      this.$router.push(`/courses/${this.courseSlug}`)
    }
  }
})
</script>
