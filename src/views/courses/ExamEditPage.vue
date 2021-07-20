<template>
  <div v-if="exam" class="p-4">
    <PageHeading
      :links="[
        { name: 'Home', url: '/' },
        { name: 'Courses', url: '/courses' },
        { name: exam.course.name, url: `/courses/${courseSlug}` },
        { name: exam.label, url: `/courses/${examSlug}` }
      ]"
    >
      <template #label>Edit exam</template>
    </PageHeading>
    <AppPanel class="flex flex-col mt-8">
      <div class="space-y-4">
        <div>
          <label for="name"><AppLabel> Name </AppLabel></label>
          <p class="text-sm text-gray-500">
            The name should be unique for this course.
          </p>
          <AppInput
            class="mt-1 w-1/2"
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
          <label for="attempts"><AppLabel> Warnings </AppLabel></label>
          <p class="text-sm text-gray-500">
            The maximum number of warnings for this exam.
          </p>
          <div class="inline-block mt-1">
            <NumberInput
              v-model.number="maxWarnings"
              :min="1"
              :max="100"
              id="warnings"
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
              :max="exam.course.weeks"
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
          <label for="shuffle"><AppLabel>Use All Exam Items</AppLabel></label>
          <p class="text-sm text-gray-500">
            Turn off to randomly pick a subset of questions for each attempt.
          </p>
          <AppSwitch class="mt-1" v-model="useAllExamItems" />
        </div>
        <div v-if="useAllExamItems">
          <label for="shuffle"><AppLabel> Shuffle Questions </AppLabel></label>
          <p class="text-sm text-gray-500">
            Turn on to shuffle the order of the questions during exams.
          </p>
          <AppSwitch class="mt-1" v-model="random" />
        </div>
        <div v-else>
          <label for="week"><AppLabel>Number of Exam Items</AppLabel></label>
          <p class="text-sm text-gray-500">
            How many questions to pick randomly for each attempt
          </p>
          <div class="inline-block mt-1">
            <NumberInput
              v-model.number="length"
              :min="1"
              :max="examItems.length"
              id="week"
            />
          </div>
        </div>
      </div>
      <List class="mt-4">
        <ExamItemInput
          v-model:question="examItem.question"
          v-model:textAnswer="examItem.textAnswer"
          v-model:answer="examItem.answer"
          v-model:question-type="examItem.questionType"
          v-model:choices="examItem.choices"
          v-model:shuffleChoices="examItem.shuffleChoices"
          v-model:caseSensitive="examItem.caseSensitive"
          v-model:points="examItem.points"
          v-for="(examItem, i) in examItems"
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
import { ExamWithAnswers, NewExamItem, QuestionType } from '@/types'
import { defineComponent, reactive, toRefs } from 'vue'
import dayjs from 'dayjs'
import FormError from '@/components/FormError.vue'
import useFetch from '@/composables/use-fetch'
import useSnackbar from '@/composables/use-snackbar'
import List from '@/components/List.vue'
import PageHeading from '@/components/PageHeading.vue'
import NProgress from 'nprogress'
import userService from '@/services/user'

export default defineComponent({
  name: 'ExamEditPage',
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
    const { setSnackbarMessage } = useSnackbar()

    const [exam, fetchExam, loading, error] = useFetch<ExamWithAnswers | null>(
      () => userService.getExam(props.courseSlug, props.examSlug)
    )

    const formDetails = reactive({
      examName: '',
      examSeconds: 3600,
      maxAttempts: 3,
      maxWarnings: 5,
      random: false,
      length: 1,
      useAllExamItems: true,
      week: 1,
      setDate: true,
      startDate: undefined as string | undefined,
      endDate: undefined as string | undefined,
      examItems: [
        {
          question: '',
          textAnswer: '',
          answer: [''],
          choices: [],
          questionType: 'text',
          shuffleChoices: false,
          caseSensitive: true,
          points: 1
        }
      ] as (NewExamItem & { textAnswer: string })[]
    })

    fetchExam().then(() => {
      if (exam.value) {
        formDetails.examName = exam.value.label
        formDetails.examSeconds = exam.value.duration
        formDetails.maxAttempts = exam.value.maxAttempts
        formDetails.random = exam.value.random
        formDetails.length = exam.value.length
        formDetails.useAllExamItems =
          exam.value.length < exam.value.examItems.length
        formDetails.week = exam.value.week
        formDetails.setDate =
          exam.value.startDate !== undefined && exam.value.endDate !== undefined
        formDetails.startDate = exam.value.startDate?.toString()
        formDetails.endDate = exam.value.endDate?.toString()
        formDetails.examItems = exam.value.examItems.map(examItem => {
          return {
            ...examItem,
            textAnswer: ['text', 'multiple choice'].includes(
              examItem.questionType
            )
              ? examItem.answer[0]
              : ''
          }
        })
      }
    })

    return {
      exam,
      loading,
      error,
      setSnackbarMessage,
      ...toRefs(formDetails)
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
        if (item.questionType !== 'essay') {
          if (item.questionType === 'multiple answers' && !item.answer.length) {
            error = `Please enter an answer for number ${i + 1}`
            return
          } else if (item.textAnswer.length === 0) {
            error = `Please enter an answer for number ${i + 1}`
            return
          }
        }
        if (!['text', 'essay'].includes(item.questionType)) {
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
      const newExamItem = {
        question: '',
        textAnswer: '',
        answer: [''],
        choices: [] as string[],
        questionType: 'text' as QuestionType,
        shuffleChoices: false,
        caseSensitive: true,
        points: 1
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
        await examsService.edit(this.exam?.id ?? '', {
          label: this.examName,
          random: this.random,
          length: this.useAllExamItems ? this.examItems.length : this.length,
          duration: this.examSeconds,
          courseId: this.exam?.course.id ?? '',
          maxAttempts: this.maxAttempts,
          maxWarnings: this.maxWarnings,
          examItems: this.examItems.map(examItem => {
            if (['text', 'multiple choice'].includes(examItem.questionType)) {
              return {
                ...examItem,
                answer: [examItem.textAnswer]
              }
            } else if (examItem.questionType === 'multiple answers') {
              return {
                ...examItem,
                points: examItem.choices.length,
                choices: examItem.answer.filter(answer =>
                  examItem.choices.includes(answer)
                )
              }
            }
            return examItem
          }),
          week: this.week,
          startDate:
            this.setDate && this.startDate
              ? new Date(this.startDate)
              : undefined,
          endDate:
            this.setDate && this.endDate ? new Date(this.endDate) : undefined
        })
        await this.$router.push(`/courses/${this.courseSlug}`)
        this.setSnackbarMessage('Exam successfully updated', 'success')
      } catch (error) {
        this.setSnackbarMessage('Could not update exam', 'error')
      } finally {
        NProgress.done()
      }
    }
  }
})
</script>
