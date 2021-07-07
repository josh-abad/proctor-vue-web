<template>
  <div id="overview-panel" role="tabpanel" aria-labelledby="overview-tab">
    <FadeTransition>
      <div v-if="hasError">Could not load course.</div>
      <div v-else-if="isLoading" class="space-y-2">
        <div v-for="i in 8" :key="i">
          <Subheading class="pb-3">
            <AppSkeleton class="w-28 h-2" />
          </Subheading>
          <div class="flex justify-between items-center py-3">
            <AppSkeleton class="w-32 h-3" />
            <SVGCheckbox />
          </div>
        </div>
      </div>
      <div v-else-if="course">
        <section v-if="course.externalLinks.length > 0">
          <Subheading>
            <AppLabel emphasis>Pinned Links</AppLabel>
            <button
              class="focus:outline-none"
              @click="editPinnedLinks = !editPinnedLinks"
            >
              <AppLabel
                class="text-indigo-600 dark:text-indigo-400"
                v-if="$store.getters.permissions(['admin', 'coordinator'])"
              >
                {{ editPinnedLinks ? 'Cancel' : 'Edit' }}
              </AppLabel>
            </button>
          </Subheading>
          <ul class="py-3 space-y-2">
            <li
              class="flex items-start"
              v-for="externalLink in course.externalLinks"
              :key="externalLink._id"
            >
              <button
                aria-label="Delete Link"
                v-if="editPinnedLinks"
                class="mt-1 focus:outline-none"
                @click="deleteExternalLink(externalLink._id)"
              >
                <MinusCircleIcon class="w-5 h-5 text-red-500" />
              </button>
              <ExternalLinkItem
                class="ml-4 duration-200 ease-out first:ml-0"
                :external-link="externalLink"
              />
            </li>
          </ul>
        </section>
        <div
          class="flex flex-col mt-2 space-y-2 first:mt-0"
          v-if="course.exams.length"
        >
          <Week
            v-for="exams in examsByWeek"
            :key="exams[0].week"
            :course-slug="slug"
            :week="exams[0].week"
            :exams="exams"
          />
        </div>
        <EmptyState v-else>
          <template #icon><DocumentTextIcon /></template>
          <template #content>No exams found.</template>
        </EmptyState>
      </div>
    </FadeTransition>
  </div>
</template>

<script lang="ts">
import SVGCheckbox from '@/components/SVGCheckbox.vue'
import AppSkeleton from '@/components/ui/AppSkeleton.vue'
import { ExamWithTaken } from '@/types'
import { computed, defineComponent, ref, watch } from 'vue'
import Week from './components/Week/Week.vue'
import userService from '@/services/user'
import Subheading from '@/components/Subheading.vue'
import EmptyState from '@/components/EmptyState.vue'
import { DocumentTextIcon } from '@heroicons/vue/outline'
import { MinusCircleIcon } from '@heroicons/vue/solid'
import FadeTransition from '@/components/transitions/FadeTransition.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import ExternalLinkItem from '@/components/ExternalLinkItem.vue'
import useCourse from '@/composables/use-course'
import NProgress from 'nprogress'
import coursesService from '@/services/courses'
import useSnackbar from '@/composables/use-snackbar'

export default defineComponent({
  name: 'CourseOverview',
  components: {
    Week,
    AppSkeleton,
    SVGCheckbox,
    Subheading,
    EmptyState,
    DocumentTextIcon,
    FadeTransition,
    AppLabel,
    ExternalLinkItem,
    MinusCircleIcon
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { course, isLoading, hasError } = useCourse(props.slug)

    watch(
      course,
      loadedCourse => {
        if (loadedCourse) {
          userService.getExamsTaken(loadedCourse.id).then(fetchedExamsTaken => {
            examsTaken.value = fetchedExamsTaken
          })
        }
      },
      { immediate: true }
    )

    const examsTaken = ref<{ exam: string; isTaken: boolean }[]>([])

    const examsWithTaken = computed(() => {
      if (!course.value) {
        return []
      }
      return course.value.exams.map(exam => ({
        ...exam,
        isTaken:
          examsTaken.value.find(taken => exam.id === taken.exam)?.isTaken ??
          false
      }))
    })

    const examsByWeek = computed(() => {
      const map = new Map(
        Array.from(examsWithTaken.value, exam => [
          exam.week,
          [] as ExamWithTaken[]
        ])
      )
      examsWithTaken.value.forEach(exam => map.get(exam.week)?.push(exam))
      return Array.from(map.values())
    })

    const editPinnedLinks = ref(false)
    const { setSnackbarMessage } = useSnackbar()

    const deleteExternalLink = async (externalLinkId: string) => {
      if (course.value) {
        try {
          NProgress.start()
          await coursesService.deleteExternalLink(
            course.value.id,
            externalLinkId
          )
          course.value = {
            ...course.value,
            externalLinks: course.value.externalLinks.filter(externalLink => {
              return externalLink._id !== externalLinkId
            })
          }
          setSnackbarMessage('Removed link', 'info')
        } catch (error) {
          setSnackbarMessage('Could not delete external link', 'error')
        } finally {
          NProgress.done()
        }
      }
    }

    return {
      course,
      isLoading,
      hasError,
      examsByWeek,
      examsTaken,
      editPinnedLinks,
      deleteExternalLink
    }
  }
})
</script>
