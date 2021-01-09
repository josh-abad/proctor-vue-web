<template>
  <div>
    <BasePanel>
      <div class="text-xl">Create New Exam for {{ course.name }}</div>
      <div class="flex mt-3 divide-x divide-gray-300 dark:divide-gray-700">
        <div>
          <label>
            <BaseLabel>Name</BaseLabel>
            <BaseInput v-model="examName" type="text" />
          </label>
        </div>
        <div class="ml-6 pl-6">
          <label>
            <BaseLabel>Duration</BaseLabel>
            <input
              class="dark:bg-gray-800 rounded w-16"
              type="number"
              name=""
              id="hours"
              min="0"
              max="2"
              v-model.number="examHours"
              placeholder="0"
            />
            {{ hour }}
          </label>
          <label>
            <input
              class="dark:bg-gray-800 rounded ml-3 w-16"
              type="number"
              name=""
              id="minutes"
              min="0"
              max="59"
              v-model.number="examMinutes"
              placeholder="0"
            />
            min
          </label>
        </div>
        <div class="ml-6">
          <label>
            <BaseLabel>Attempts</BaseLabel>
            <input
              class="dark:bg-gray-800 rounded w-16"
              type="number"
              name=""
              id="minutes"
              min="1"
              max="5"
              v-model.number="maxAttempts"
            />
          </label>
        </div>
        <div class="ml-6">
          <label>
            <BaseLabel>Week</BaseLabel>
            <input
              class="dark:bg-gray-800 rounded w-16"
              type="number"
              id="week"
              min="1"
              :max="course.weeks"
              v-model.number="week"
            />
          </label>
        </div>
      </div>
      <div class="mt-4">
        <div class="border-b border-gray-300 dark:border-gray-700">
          <BaseLabel emphasis>Exam Items</BaseLabel>
        </div>
        <div class="divide-y divide-gray-300 dark:divide-gray-700">
          <div v-for="(examItem, i) in examItems" :key="i" class="flex mb-4">
            <div class="p-3 text-gray-500 font-thin">
              {{ i + 1 }}
            </div>
            <div class="p-3 flex-grow">
              <div>
                <div class="flex items-center justify-between">
                  <label for="question">
                    <BaseLabel>Question</BaseLabel>
                  </label>
                  <button
                    class="focus:outline-none text-gray-500 dark:hover:text-white mb-1"
                    @click="removeExamItem(i)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      class="fill-current w-5 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <BaseInput
                  id="question"
                  class="w-full"
                  v-model="examItem.question"
                  type="text"
                />
              </div>
              <div class="mt-4">
                <label>
                  <BaseLabel>Answer</BaseLabel>
                  <BaseInput
                    class="w-full"
                    v-model="examItem.answer"
                    type="text"
                  />
                </label>
              </div>
            </div>
            <!-- <div>
            <label>
              <div>Question Type</div>
              <BaseDropdown
                v-model="examItem.questionType"
                :options="questionTypes"
              />
            </label>
          </div> -->
            <!-- <div class="mt-3" v-show="examItem.questionType !== 'text'">
            <BaseButton @click="removeExamItem(i)">Add choice</BaseButton>
          </div> -->
          </div>
        </div>
        <div class="flex justify-between">
          <div>
            <BaseButton @click="addExamItem">Add Exam Item</BaseButton>
          </div>
          <div class="ml-2">
            <BaseButton @click="saveExam" prominent>Save Exam</BaseButton>
          </div>
        </div>
      </div>
    </BasePanel>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import examsService from '@/services/exams'
import { ALERT } from '@/store/action-types'
import { ADD_EXAM } from '@/store/mutation-types'
import { Course, ExamItem, NewExam } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseInput, BaseButton, BasePanel, BaseLabel },
  name: 'ExamCreationPage',
  data () {
    return {
      examName: '',
      examHours: 1,
      examMinutes: 0,
      maxAttempts: 3,
      week: 1,
      examItems: [
        {
          question: '',
          answer: ''
        }
      ]
        }
  },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  computed: {
    hour (): string {
      return this.examHours === 1 ? 'hour' : 'hours'
    },
    course (): Course {
      return this.$store.getters.getCourseByID(this.courseId)
    },
    examDurationInSeconds (): number {
      return this.examHours * 3600 + this.examMinutes * 60
    }
  },
  methods: {
    /**
     * Determines question type based on how answer is formatted.
     * Multiple choices are delimited by commas and answers are denoted by an asterisk at the beginning.
     * For example, 'foo' is a text type question since there are no delimiters.
     * Whereas 'foo,*bar,baz' is a multiple choice, and '*foo,*bar,baz' has multiple answers.
     * @param answer the answer to parse
     */
    parseAnswer (question: string, answerValue: string): ExamItem {
      const unparsedChoices = answerValue.split(',')

      if (unparsedChoices.length === 1) {
        return {
          question,
          questionType: 'text',
          answer: unparsedChoices,
          choices: []
        }
      }

      const answer = unparsedChoices.filter(this.correctAnswer).map(choice => choice.substring(1))
      const choices = unparsedChoices.map(choice => this.correctAnswer(choice) ? choice.substring(1) : choice)
      return {
        answer,
        choices,
        question,
        questionType: answer.length === 1 ? 'multiple choice' : 'multiple answers'
      }
    },
    correctAnswer (choice: string): boolean {
      return choice.charAt(0) === '*'
    },
    addExamItem (): void {
      this.examItems.push({
        question: '',
        answer: ''
      })
    },
    removeExamItem (index: number): void {
      this.examItems = this.examItems.filter((item, i) => i !== index)
    },
    async saveExam (): Promise<void> {
      try {
        const newExam: NewExam = {
          label: this.examName,
          random: false,
          length: this.examItems.length,
          duration: this.examDurationInSeconds,
          courseId: this.courseId,
          maxAttempts: this.maxAttempts,
          examItems: this.examItems.map(examItem => this.parseAnswer(examItem.question, examItem.answer)),
          week: this.week
        }
        const createdExam = await examsService.create(newExam)
        this.$store.commit(ADD_EXAM, createdExam)
        this.$store.dispatch(ALERT, 'Exam successfully created')
        this.$router.push(`/courses/${this.courseId}`)
      } catch (error) {
        this.$store.dispatch(ALERT, error.response.data.error)
      }
    }
  }
})
</script>
