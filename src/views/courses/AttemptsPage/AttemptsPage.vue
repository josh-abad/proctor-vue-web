<template>
  <div class="p-4">
    <transition name="fade" mode="out-in">
      <div v-if="errorLoadingExam"><ErrorLoading /></div>
      <div v-else-if="loadingExam">
        <SkeletonPageHeader />
        <AppPanel class="mt-8">
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
        <PageHeader :links="links">
          <template #label>{{ exam.label }}</template>
          <template
            #actions
            v-if="$store.getters.permissions(['coordinator', 'admin'])"
          >
            <ModalButton
              :header="`Delete ${exam.label}`"
              :message="`Are you sure you want to delete ${exam.label}?`"
              action-label="Delete"
              @confirm="deleteExam"
              danger
            >
              <span class="flex items-center">
                <TrashIcon class="w-5 h-5" />
                <span class="ml-1.5">Delete</span>
              </span>
            </ModalButton>
          </template>
        </PageHeader>
        <AppPanel class="mt-8">
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
            <List class="mt-2" v-else-if="attempts.length > 0">
              <AttemptItem
                v-for="(attempt, i) in attempts"
                :key="attempt.id"
                :attempt-number="i + 1"
                :attempt="attempt"
              />
            </List>
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
import SkeletonPageHeader from '@/components/SkeletonPageHeader.vue'
import { TrashIcon } from '@heroicons/vue/solid'
import List from '@/components/List.vue'

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
    ClockIcon,
    ExclamationCircleIcon,
    ErrorLoading,
    SkeletonAttemptsList,
    AppSkeleton,
    SkeletonPageHeader,
    TrashIcon,
    List
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
      deleteExamModal
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
