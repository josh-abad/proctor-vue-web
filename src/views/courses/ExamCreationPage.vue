<template>
  <div v-if="course" class="form">
    <AppPanel class="form__panel">
      <header class="form__header">New exam for {{ course.name }}</header>
      <FormError class="form__error" v-show="formError">
        {{ formError }}
      </FormError>
      <div class="form__details">
        <div class="form__detail">
          <label for="name">
            <AppLabel>Name</AppLabel>
          </label>
          <AppInput type="text" id="name" v-model="examName" />
        </div>
        <div class="form__detail">
          <label for="duration">
            <AppLabel>Duration</AppLabel>
          </label>
          <TimePicker id="duration" v-model.number="examSeconds" />
        </div>
        <div class="form__detail">
          <label for="attempts">
            <AppLabel>Attempts</AppLabel>
          </label>
          <div class="inline-block">
            <NumberInput
              v-model.number="maxAttempts"
              :min="1"
              :max="5"
              id="attempts"
            />
          </div>
        </div>
        <div class="form__detail">
          <label for="week">
            <AppLabel>Week</AppLabel>
          </label>
          <div class="inline-block">
            <NumberInput
              v-model.number="week"
              :min="1"
              :max="course.weeks"
              id="week"
            />
          </div>
        </div>
        <div class="form__detail">
          <label for="startDate">
            <AppLabel>Start Date</AppLabel>
          </label>
          <DatePicker id="startDate" v-model="startDate" />
        </div>
        <div class="form__detail">
          <label for="endDate">
            <AppLabel>End Date</AppLabel>
          </label>
          <DatePicker id="endDate" v-model="endDate" />
        </div>
      </div>
      <div class="form__exam-items">
        <ExamItemInput
          v-model:question="examItem.question"
          v-model:answer="examItem.answer"
          v-model:question-type="examItem.questionType"
          v-model:choices="examItem.choices"
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
      </div>
      <footer class="form__footer">
        <AppButton @click="addExamItem()">Add Question</AppButton>
        <AppButton @click="saveExam" :disabled="!valid" prominent>
          Save Exam
        </AppButton>
      </footer>
    </AppPanel>
  </div>
</template>

<script lang="ts">
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import AppLabel from '@/components/ui/AppLabel.vue'
import AppPanel from '@/components/ui/AppPanel.vue'
import DatePicker from '@/components/DatePicker.vue'
import ExamItemInput from '@/components/ExamItemInput/ExamItemInput.vue'
import NumberInput from '@/components/NumberInput.vue'
import TimePicker from '@/components/TimePicker.vue'
import examsService from '@/services/exams'
import { Course, ExamItem, NewExam, QuestionType } from '@/types'
import { defineComponent } from 'vue'
import dayjs from 'dayjs'
import FormError from '@/components/FormError.vue'
import useFetch from '@/composables/use-fetch'
import coursesService from '@/services/courses'
import useSnackbar from '@/composables/use-snackbar'

export default defineComponent({
  name: 'ExamCreationPage',
  components: { AppButton, AppPanel, AppLabel, TimePicker, NumberInput, ExamItemInput, DatePicker, AppInput, FormError },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { setSnackbarMessage } = useSnackbar()

    const [
      course,
      fetchCourse,
      loading,
      error
    ] = useFetch<Course | null>(() => coursesService.getCourse(props.courseId))

    fetchCourse()

    return {
      course,
      loading,
      error,
      setSnackbarMessage
    }
  },
  data () {
    return {
      examName: '',
      examSeconds: 3600,
      maxAttempts: 3,
      week: 1,
      startDate: '',
      endDate: '',
      examItems: [{
        question: '',
        answer: [''],
        choices: [],
        questionType: 'text' as QuestionType
      }] as ExamItem[],
      openCalendar: false
    }
  },
  computed: {
    questionsInvalid (): string {
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
    dateInvalid (): string {
      if (!this.startDate || !this.endDate) {
        return 'Please set the start and end dates for the exam.'
      }
      if (!dayjs(this.startDate).isBefore(this.endDate)) {
        return 'The start date must be before the end date.'
      }
      if (!dayjs().isBefore(this.endDate)) {
        return 'The end date must be set after today.'
      }
      return ''
    },
    formError (): string {
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
    valid (): boolean {
      return !this.formError
    }
  },
  methods: {
    addExamItem (i?: number) {
      const newExamItem: ExamItem = {
        question: '',
        answer: [''],
        choices: [],
        questionType: 'text'
      }
      if (i) {
        this.examItems.splice(i, 0, newExamItem)
      } else {
        this.examItems.push(newExamItem)
      }
    },
    removeExamItem (index: number) {
      this.examItems = this.examItems.filter((item, i) => i !== index)
    },
    async saveExam () {
      try {
        const newExam: NewExam = {
          label: this.examName,
          random: false,
          length: this.examItems.length,
          duration: this.examSeconds,
          courseId: this.courseId,
          maxAttempts: this.maxAttempts,
          examItems: this.examItems,
          week: this.week,
          startDate: new Date(this.startDate),
          endDate: new Date(this.endDate)
        }
        await examsService.create(newExam)
        this.setSnackbarMessage('Exam successfully created')
        this.$router.push(`/courses/${this.courseId}`)
      } catch (error) {
        this.setSnackbarMessage(error.response.data.error)
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.form {
  @apply p-4;
}

.form__panel {
  @apply flex flex-col;
}

.form__error {
  @apply mt-4 self-start;
}

.form__header {
  @apply text-xl;
}

.form__details {
  @apply flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between;
}

.form__footer {
  @apply flex justify-between;
}

.form__details {
  @apply space-x-2;
}

.form__details,
.form__exam-items {
  @apply mt-4;
}
</style>
