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
            <div class="flex items-center">
              <ModalButton
                v-if="!exam.startDate"
                :header="`Open ${exam.label}`"
                :message="`Are you sure you want to open ${exam.label}?`"
                action-label="Open"
                @confirm="openExam"
                prominent
              >
                <span class="flex items-center">
                  <LockOpenIcon class="w-5 h-5" />
                  <span class="ml-1.5">Open Exam</span>
                </span>
              </ModalButton>
              <ModalButton
                v-else-if="locked === 0 && !exam.endDate"
                :header="`Close ${exam.label}`"
                :message="`Are you sure you want to close ${exam.label}?`"
                action-label="Close"
                @confirm="closeExam"
                danger
              >
                <span class="flex items-center">
                  <LockClosedIcon class="w-5 h-5" />
                  <span class="ml-1.5">Close Exam</span>
                </span>
              </ModalButton>
              <router-link
                :to="`/courses/${courseSlug}/${examSlug}/edit`"
                v-if="locked === -1"
                class="ml-2"
              >
                <AppButton>
                  <span class="flex items-center">
                    <PencilIcon class="w-5 h-5" />
                    <span class="flex items-center">
                      <span class="ml-1.5">Edit Exam</span>
                    </span>
                  </span>
                </AppButton>
              </router-link>
              <ModalButton
                :header="`Delete ${exam.label}`"
                :message="`Are you sure you want to delete ${exam.label}?`"
                action-label="Delete"
                @confirm="deleteExam"
                class="ml-2"
                danger
              >
                <span class="flex items-center">
                  <TrashIcon class="w-5 h-5" />
                  <span class="ml-1.5">Delete</span>
                </span>
              </ModalButton>
            </div>
          </template>
          <template #meta>
            <PageHeadingMeta>
              <PageHeadingMetaItem v-if="locked">
                <template #icon>
                  <LockClosedIcon />
                </template>
                <template #content> Locked </template>
              </PageHeadingMetaItem>
              <PageHeadingMetaItem v-if="date">
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
        <SetupModal
          v-model="setupModal"
          :camera-status="cameraStatus"
          :course-slug="courseSlug"
          :exam-slug="examSlug"
          :exam="exam"
          :in-progress-attempt="inProgressAttempt"
          :identification="{ isIdentified, isIdentifying }"
          :tracking="isTrackingOn"
          :extension="isInstalled"
        />
      </div>
    </transition>
    <div class="flex mt-8">
      <AppPanel class="w-full">
        <router-view
          :is-setup-complete="isIdentified"
          v-model:setup="setupModal"
          v-model:active="isActive"
          v-model:examSubmittedModal="examSubmittedModal"
          v-model:warnings="warnings"
          v-model:inProgressAttempt="inProgressAttempt"
        />
      </AppPanel>
      <div id="quiz-navigation"></div>
    </div>
    <div>
      <IndicatorBar :class="isActive ? 'block' : 'hidden'">
        <div id="timer"></div>
        <Webcam
          :duration="detectionDuration"
          :on="setupModal || isActive"
          @no-face-seen="handleNoFaceSeen"
          @unidentified-face="handleUnidentifiedFace"
          @camera-status-change="handleCameraStatusChange"
          v-model:identified="identified"
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
          <p>Please refrain from leaving this page during the exam.</p>
          <p>
            You have
            {{ warningsLeft }}
            {{ warningsLeft === 1 ? 'warning' : 'warnings' }} left.
          </p>
        </template>
      </AppModal>
    </teleport>
    <teleport to="#modals">
      <AppModal v-model="examSubmittedModal">
        <template #header>Exam Submitted</template>
        <template #body> You exceeded the number of warnings. </template>
      </AppModal>
    </teleport>
  </div>
</template>

<script lang="ts">
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
  LockOpenIcon,
  LockClosedIcon,
  ClockIcon,
  PencilIcon,
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
import AppButton from '@/components/ui/AppButton.vue'
import SetupModal from '@/components/SetupModal.vue'
import useIdentify from '@/composables/use-identify'
import useExtension from '@/composables/use-extension'
import useExam from '@/composables/use-exam'

dayjs.extend(duration)

export default defineComponent({
  name: 'ExamView',
  components: {
    ErrorLoading,
    SkeletonPageHeading,
    AppPanel,
    PageHeading,
    ModalButton,
    TrashIcon,
    CalendarIcon,
    LockOpenIcon,
    LockClosedIcon,
    ClockIcon,
    DocumentDuplicateIcon,
    ExclamationIcon,
    IndicatorBar,
    Webcam,
    PageHeadingMetaItem,
    PageHeadingMeta,
    AppModal,
    PencilIcon,
    AppButton,
    SetupModal
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

    const { exam, fetchExam, isLoading, hasError } = useExam(
      props.courseSlug,
      props.examSlug
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
      if (exam.value) {
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
    }

    const openExam = async () => {
      if (exam.value) {
        try {
          NProgress.start()
          exam.value = await examsService.openExam(exam.value.id)
          setSnackbarMessage('The exam is now open.', 'success')
        } catch (error) {
          setSnackbarMessage('Could not open exam', 'error')
        } finally {
          NProgress.done()
        }
      }
    }

    const closeExam = async () => {
      if (exam.value) {
        try {
          NProgress.start()
          exam.value = await examsService.closeExam(exam.value.id)
          setSnackbarMessage('The exam is now closed.', 'success')
        } catch (error) {
          setSnackbarMessage('Could not close exam', 'error')
        } finally {
          NProgress.done()
        }
      }
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

    // TODO: set max warnings per exam
    const maxWarnings = ref(5)

    const detectionDuration = ref(10)

    const handleNoFaceSeen = () => {
      if (isActive.value) {
        warnings.value++
        setSnackbarMessage(
          `No face seen for ${detectionDuration.value} seconds.`,
          'warning'
        )
      }
    }

    const handleUnidentifiedFace = () => {
      if (isActive.value) {
        warnings.value++
        setSnackbarMessage(
          `Face unidentified for ${detectionDuration.value} seconds`,
          'warning'
        )
      }
    }

    const id = 'plcaollkdcilnjnibcijlpleadniggbp'
    const flaggedSites = ['reddit', 'coursehero', 'facebook', 'scribd']

    const { isTrackingOn, isInstalled, enableTracking, disableTracking } =
      useExtension(
        id,
        flaggedSites,
        site => {
          if (isActive.value) {
            warnings.value++
            setSnackbarMessage(`${site} is a restricted site.`, 'warning')
          }
        },
        site => {
          if (isActive.value) {
            warnings.value++
            setSnackbarMessage(
              `Please refrain from staying in ${site}`,
              'warning'
            )
          }
        }
      )

    const strictMode = computed(() => {
      return !isTrackingOn.value && isActive.value
    })

    useKeepOnPage({
      preventLeave: strictMode,
      onLeaveAttempt: () => {
        setSnackbarMessage(
          'You cannot leave until you have finished the exam',
          'warning'
        )
      },
      onLeaveFocus: () => {
        if (isActive.value) {
          warnings.value++
          if (!warningModal.value && warnings.value < maxWarnings.value) {
            warningModal.value = true
          }
        }
      },
      onLeaveTimeout: () => {
        if (isActive.value) {
          warnings.value++
          if (!warningModal.value && warnings.value < maxWarnings.value) {
            warningModal.value = true
          }
        }
      }
    })

    window.addEventListener('keyup', e => {
      if (isActive.value && e.code === 'PrintScreen') {
        warnings.value++
        setSnackbarMessage('Please refrain from screen capturing.', 'warning')
      }
    })

    const cameraStatus = ref<'loading' | 'enabled' | 'disabled'>('disabled')
    const handleCameraStatusChange = (
      status: 'loading' | 'enabled' | 'disabled'
    ) => {
      cameraStatus.value = status
    }

    const setupModal = ref(false)

    watch(isActive, active => {
      if (!active) {
        warnings.value = 0
        cameraStatus.value = 'disabled'
        warningModal.value = false
        if (isTrackingOn.value) {
          disableTracking()
        }
      }
    })

    const examSubmittedModal = ref(false)

    const inProgressAttempt = ref<string>()

    const identified = ref(false)

    const { isIdentified, isIdentifying, reset } = useIdentify(identified)

    watch(setupModal, isOpen => {
      if (!isOpen) {
        reset()
      } else {
        if (isInstalled.value) {
          enableTracking()
        }
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
      openExam,
      closeExam,
      deleteExam,
      exam,
      isLoading,
      hasError,
      links,
      setupModal,
      examSubmittedModal,
      maxWarnings,
      inProgressAttempt,
      identified,
      isIdentified,
      isIdentifying,
      detectionDuration,
      isTrackingOn,
      isInstalled
    }
  },
  computed: {
    warningsLeft(): number {
      return this.maxWarnings - this.warnings
    },
    locked(): number {
      return this.exam ? isExamLocked(this.exam) : 0
    },
    duration(): string {
      if (!this.exam) {
        return ''
      }

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
      if (!this.exam?.endDate || !this.exam?.startDate) {
        return ''
      }
      const format = (d?: Date) => {
        return d ? dayjs(d).format('MMMM D, YYYY') : ''
      }

      if (this.locked === 1) {
        return `Closed on ${format(this.exam.endDate)}`
      } else if (this.locked === -1) {
        return `Opening on ${format(this.exam.startDate)}`
      } else if (this.exam.endDate) {
        return `Closing on ${format(this.exam.endDate)}`
      }
      return ''
    }
  }
})
</script>
