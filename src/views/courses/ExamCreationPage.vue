<template>
  <div v-if="course" class="p-4">
    <PageHeading
      :links="[
        { name: 'Home', url: '/' },
        { name: 'Courses', url: '/courses' },
        { name: course.name, url: `/courses/${course.slug}` }
      ]"
    >
      <template #label>Create exam</template>
    </PageHeading>
    <AppPanel class="flex flex-col mt-8">
      <div class="space-y-4">
        <div>
          <label for="name"><AppLabel> Name </AppLabel></label>
          <p class="text-sm text-gray-500">
            The name should be unique for this course.
          </p>
          <AppInput
            class="w-1/2 mt-1"
            type="text"
            id="name"
            v-model="examName"
          />
        </div>
        <div>
          <label for="duration"><AppLabel> Duration </AppLabel></label>
          <p class="text-sm text-gray-500">How long the exam will last.</p>
          <TimePicker class="mt-1" id="duration" v-model.number="examSeconds" />
        </div>
        <div>
          <label for="attempts"><AppLabel> Attempts </AppLabel></label>
          <p class="text-sm text-gray-500">
            The number of attempts every user is allowed.
          </p>
          <div class="inline-block mt-1">
            <NumberInput
              v-model.number="maxAttempts"
              :min="1"
              :max="5"
              id="attempts"
            />
          </div>
        </div>

        <div>
          <label for="week"><AppLabel> Week </AppLabel></label>
          <p class="text-sm text-gray-500">
            The week the exam will appear under in Overview.
          </p>
          <div class="inline-block mt-1">
            <NumberInput
              v-model.number="week"
              :min="1"
              :max="course.weeks"
              id="week"
            />
          </div>
        </div>
        <div>
          <label for="setDate"><AppLabel>Set Date</AppLabel></label>
          <p class="text-sm text-gray-500">
            Turn on to set in advance when the exam will open and close.
          </p>
          <AppSwitch id="setDate" class="mt-1" v-model="setDate" />
        </div>
        <div v-if="setDate">
          <label for="startDate"><AppLabel> Start Date </AppLabel></label>
          <p class="text-sm text-gray-500">The date the exam will open.</p>
          <DatePicker class="mt-1" id="startDate" v-model="startDate" />
        </div>
        <div v-if="setDate">
          <label for="endDate"><AppLabel> End Date </AppLabel></label>
          <p class="text-sm text-gray-500">The date the exam will close.</p>
          <DatePicker class="mt-1" id="endDate" v-model="endDate" />
        </div>

        <div>
          <label for="shuffle"><AppLabel> Shuffle Questions </AppLabel></label>
          <p class="text-sm text-gray-500">
            Turn on to shuffle the order of the questions during exams.
          </p>
          <AppSwitch class="mt-1" v-model="random" />
        </div>
      </div>
      <List class="mt-4">
        <ExamItemInput
          v-model:question="examItem.question"
          v-model:answer="examItem.answer"
          v-model:question-type="examItem.questionType"
          v-model:choices="examItem.choices"
          v-model:shuffleChoices="examItem.shuffleChoices"
          v-model:caseSensitive="examItem.caseSensitive"
          v-for="(examItem, i) in examItems"
          :count="i + 1"
          :key="i"
          @discard="removeExamItem(i)"
          @add-choice="
            examItem.choices.push(`Choice ${examItem.choices.length + 1}`)
          "
          @add-question="addExamItem(i + 1)"
          class="flex mb-4"
        />
      </List>
      <footer class="flex justify-between">
        <AppButton @click="addExamItem()">Add Question</AppButton>
        <div class="flex items-baseline">
          <FormError class="self-start" v-show="formError">
            {{ formError }}
          </FormError>
          <AppButton
            class="ml-4"
            @click="saveExam"
            :disabled="!valid"
            prominent
          >
            Save Exam
          </AppButton>
        </div>
      </footer>
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import AppSwitch from '@/components/ui/AppSwitch.vue'
import DatePicker from '@/components/DatePicker.vue'
import ExamItemInput from '@/components/ExamItemInput/ExamItemInput.vue'
import NumberInput from '@/components/ui/NumberInput.vue'
import TimePicker from '@/components/TimePicker.vue'
import examsService from '@/services/exams'
import { CourseWithExams, NewExamItem } from '@/types'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import FormError from '@/components/FormError.vue'
import useFetch from '@/composables/use-fetch'
import coursesService from '@/services/courses'
import useSnackbar from '@/composables/use-snackbar'
import List from '@/components/List.vue'
import PageHeading from '@/components/PageHeading.vue'
import NProgress from 'nprogress'

export default defineComponent({
  name: 'ExamCreationPage',
  components: {
    AppButton,
    AppPanel,
    AppSwitch,
    AppLabel,
    TimePicker,
    NumberInput,
    ExamItemInput,
    DatePicker,
    AppInput,
    FormError,
    List,
    PageHeading
  },
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { setSnackbarMessage } = useSnackbar()

    const [course, fetchCourse, loading, error] =
      useFetch<CourseWithExams | null>(() =>
        coursesService.getCourse(props.slug)
      )

    fetchCourse()

    return {
      course,
      loading,
      error,
      setSnackbarMessage
    }
  },
  data() {
    return {
      examName: '',
      examSeconds: 3600,
      maxAttempts: 3,
      random: false,
      week: 1,
      setDate: true,
      startDate: undefined as string | undefined,
      endDate: undefined as string | undefined,
      examItems: [
        {
          question: '',
          answer: [''],
          choices: [],
          questionType: 'text',
          shuffleChoices: false,
          caseSensitive: true
        }
      ] as NewExamItem[]
    }
  },
  computed: {
    questionsInvalid(): string {
      if (!this.examItems.length) {
        return 'Please create an exam item.'
      }

      let error = ''
      this.examItems.forEach((item, i) => {
        if (error) return
        if (!item.question) {
          error = `Please enter a question for number ${i + 1}`
          return
        }
        if (!item.answer.length || item.answer.includes('')) {
          error = `Please enter an answer for number ${i + 1}`
          return
        }
        if (item.questionType !== 'text') {
          if (!item.choices.length) {
            error = `Please create choices for number ${i + 1}`
            return
          }
          if (item.choices.includes('')) {
            error = `Please fill out all choices for number ${i + 1}`
          }
        }
      })
      return error
    },
    dateInvalid(): string {
      if (this.setDate) {
        if (!this.startDate || !this.endDate) {
          return 'Please set the start and end dates for the exam.'
        }
        if (!dayjs(this.startDate).isBefore(this.endDate)) {
          return 'The start date must be before the end date.'
        }
        if (!dayjs().isBefore(this.endDate)) {
          return 'The end date must be set after today.'
        }
      }
      return ''
    },
    formError(): string {
      if (!this.examName) {
        return 'Please enter a name for the exam.'
      }
      if (this.examSeconds === 0) {
        return 'Please set a valid duration.'
      }
      if (this.dateInvalid) {
        return this.dateInvalid
      }
      if (this.questionsInvalid) {
        return this.questionsInvalid
      }
      return ''
    },
    valid(): boolean {
      return !this.formError
    }
  },
  methods: {
    addExamItem(i?: number) {
      const newExamItem: NewExamItem = {
        question: '',
        answer: [''],
        choices: [],
        questionType: 'text',
        shuffleChoices: false,
        caseSensitive: true
      }
      if (i) {
        this.examItems.splice(i, 0, newExamItem)
      } else {
        this.examItems.push(newExamItem)
      }
    },
    removeExamItem(index: number) {
      this.examItems = this.examItems.filter((item, i) => i !== index)
    },
    async saveExam() {
      try {
        NProgress.start()
        await examsService.create({
          label: this.examName,
          random: this.random,
          length: this.examItems.length,
          duration: this.examSeconds,
          courseId: this.course?.id ?? '',
          maxAttempts: this.maxAttempts,
          examItems: this.examItems,
          week: this.week,
          startDate:
            this.setDate && this.startDate
              ? new Date(this.startDate)
              : undefined,
          endDate:
            this.setDate && this.endDate ? new Date(this.endDate) : undefined
        })
        this.setSnackbarMessage('Exam successfully created', 'success')
        await this.$router.push(`/courses/${this.slug}`)
      } catch (error) {
        this.setSnackbarMessage(
          `${this.examName} already exists in ${
            this.course?.name ?? 'this course'
          }.`,
          'error'
        )
      } finally {
        NProgress.done()
      }
    }
  }
})
</script>
