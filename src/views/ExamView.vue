<template>
  <div class="p-4">
    <transition name="fade" mode="out-in">
      <div v-if="hasError"><ErrorLoading /></div>
      <div v-else-if="isLoading">
        <SkeletonPageHeading />
      </div>
      <div v-else-if="exam">
        <PageHeading :links="links">
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
          <template #meta>
            <PageHeadingMeta>
              <PageHeadingMetaItem v-if="locked">
                <template #icon>
                  <LockClosedIcon />
                </template>
                <template #content> Locked </template>
              </PageHeadingMetaItem>
              <PageHeadingMetaItem>
                <template #icon>
                  <CalendarIcon />
                </template>
                <template #content>{{ date }}</template>
              </PageHeadingMetaItem>
              <PageHeadingMetaItem>
                <template #icon>
                  <ClockIcon />
                </template>
                <template #content>{{ duration }}</template>
              </PageHeadingMetaItem>
              <PageHeadingMetaItem>
                <template #icon>
                  <DocumentDuplicateIcon />
                </template>
                <template #content
                  >{{ exam.maxAttempts }}
                  {{
                    exam.maxAttempts !== 1 ? 'attempts' : 'attempt'
                  }}</template
                >
              </PageHeadingMetaItem>
            </PageHeadingMeta>
          </template>
        </PageHeading>
      </div>
    </transition>
    <AppPanel class="mt-8">
      <router-view
        v-model:starting="isSetup"
        :camera-status="cameraStatus"
        v-model:active="isActive"
        :warnings="warnings"
      />
    </AppPanel>
    <div>
      <IndicatorBar :class="isActive ? 'block' : 'hidden'">
        <div id="timer"></div>
        <Webcam
          :duration="10"
          :on="isSetup || isActive"
          @no-face-seen="handleNoFaceSeen"
          @unidentified-face="handleUnidentifiedFace"
          @camera-status-change="handleCameraStatusChange"
        />
        <div class="flex items-center">
          <ExclamationIcon
            class="w-10 h-10 text-gray-500 stroke-current"
            :class="{ 'text-white': warnings > 0 }"
          />
          <span class="text-3xl">{{ warnings }}</span>
        </div>
      </IndicatorBar>
    </div>
    <teleport to="#modals">
      <AppModal v-model="warningModal">
        <template #header> Warning </template>
        <template #body>
          Please refrain from leaving this page during the exam.
        </template>
      </AppModal>
    </teleport>
  </div>
</template>

<script lang="ts">
import useFetch from '@/composables/use-fetch'
import coursesService from '@/services/courses'
import { computed, defineComponent, ref, watch } from 'vue'
import ErrorLoading from '@/components/ui/ErrorLoading.vue'
import SkeletonPageHeading from '@/components/SkeletonPageHeading.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import examsService from '@/services/exams'
import useSnackbar from '@/composables/use-snackbar'
import { useRouter } from 'vue-router'
import PageHeading from '@/components/PageHeading.vue'
import ModalButton from '@/components/ui/ModalButton.vue'
import {
  TrashIcon,
  CalendarIcon,
  LockClosedIcon,
  ClockIcon,
  DocumentDuplicateIcon
} from '@heroicons/vue/solid'
import { ExclamationIcon } from '@heroicons/vue/outline'
import { isExamLocked } from '@/utils/helper'
import dayjs from 'dayjs'
import useKeepOnPage from '@/composables/use-keep-on-page'
import IndicatorBar from '@/components/IndicatorBar.vue'
import Webcam from '@/components/Webcam/Webcam.vue'
import duration from 'dayjs/plugin/duration'
import useTitle from '@/composables/use-title'
import PageHeadingMetaItem from '@/components/PageHeadingMetaItem.vue'
import PageHeadingMeta from '@/components/PageHeadingMeta.vue'
import AppModal from '@/components/ui/AppModal.vue'
import NProgress from 'nprogress'

dayjs.extend(duration)

export default defineComponent({
  name: 'AttemptsView',
  components: {
    ErrorLoading,
    SkeletonPageHeading,
    AppPanel,
    PageHeading,
    ModalButton,
    TrashIcon,
    CalendarIcon,
    LockClosedIcon,
    ClockIcon,
    DocumentDuplicateIcon,
    ExclamationIcon,
    IndicatorBar,
    Webcam,
    PageHeadingMetaItem,
    PageHeadingMeta,
    AppModal
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
    const router = useRouter()

    const { setSnackbarMessage } = useSnackbar()

    const [exam, fetchExam, isLoading, hasError] = useFetch(() =>
      coursesService.getExam(props.courseSlug, props.examSlug)
    )
    const { setTitle } = useTitle()

    NProgress.start()
    fetchExam()
      .then(() => {
        if (exam.value) {
          setTitle(`${exam.value.label} - Proctor Vue`)
        }
      })
      .catch(() => {
        setTitle('Invalid Exam - Proctor Vue')
      })
      .finally(NProgress.done)

    const deleteExam = async () => {
      try {
        NProgress.start()
        await examsService.deleteExam(exam.value.id)
        setSnackbarMessage('Exam successfully deleted', 'success')
      } catch (error) {
        setSnackbarMessage('Could not delete exam', 'error')
      } finally {
        NProgress.done()
      }
      router.replace(`/courses/${props.courseSlug}`)
    }

    const links = computed(() => {
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
          name: exam.value ? exam.value.course.name : '',
          url: `/courses/${props.courseSlug}`
        }
      ]
    })

    const isActive = ref(false)

    const warningModal = ref(false)
    const warnings = ref(0)

    const handleNoFaceSeen = () => {
      if (isActive.value) {
        warnings.value++
        setSnackbarMessage('No face seen for 10 seconds.', 'warning')
      }
    }

    const handleUnidentifiedFace = () => {
      if (isActive.value) {
        warnings.value++
        setSnackbarMessage('Face unidentified for 10 seconds', 'warning')
      }
    }

    useKeepOnPage({
      preventLeave: isActive,
      onLeaveAttempt: () => {
        setSnackbarMessage(
          'You cannot leave until you have finished the exam',
          'warning'
        )
      },
      onLeaveFocus: () => {
        warnings.value++
        if (!warningModal.value) {
          warningModal.value = true
        }
      },
      onLeaveTimeout: () => {
        warnings.value++
        if (!warningModal.value) {
          warningModal.value = true
        }
      }
    })

    const cameraStatus = ref('disabled')
    const handleCameraStatusChange = (
      status: 'loading' | 'enabled' | 'disabled'
    ) => {
      cameraStatus.value = status
    }

    const isSetup = ref(false)

    watch(isActive, active => {
      if (!active) {
        warnings.value = 0
        cameraStatus.value = 'disabled'
      }
    })

    return {
      isActive,
      cameraStatus,
      handleCameraStatusChange,
      handleNoFaceSeen,
      handleUnidentifiedFace,
      warningModal,
      warnings,
      deleteExam,
      exam,
      isLoading,
      hasError,
      links,
      isSetup
    }
  },
  computed: {
    locked(): number {
      return this.exam ? isExamLocked(this.exam) : 0
    },
    duration(): string {
      const d = Math.floor(this.exam.duration / (3600 * 24))
      const h = Math.floor((this.exam.duration % (3600 * 24)) / 3600)
      const m = Math.floor((this.exam.duration % 3600) / 60)
      const s = Math.floor(this.exam.duration % 60)

      const dDisplay = d > 0 ? d + (d === 1 ? ' day, ' : ' days, ') : ''
      const hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : ''
      const mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : ''
      const sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''
      return (dDisplay + hDisplay + mDisplay + sDisplay).replace(/,\s*$/, '')
    },
    date(): string {
      const format = (d?: Date) => {
        return d ? dayjs(d).format('MMMM D, YYYY') : ''
      }

      if (this.locked === 1) {
        return `Closed on ${format(this.exam.endDate)}`
      } else if (this.locked === -1) {
        return `Opening on ${format(this.exam.startDate)}`
      }
      return `Closing on ${format(this.exam.endDate)}`
    }
  }
})
</script>
