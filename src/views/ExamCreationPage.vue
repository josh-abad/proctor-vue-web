<template>
  <div>
    <div class="bg-gray-100 dark:bg-gray-800 px-4 py-6 rounded-lg shadow">
      <div class="text-xl">Create New Exam for {{ course.name }}</div>
      <div class="flex mt-3">
        <div>
          <label>
            <div class="label-line">Name</div>
            <BaseInput class="mt-2" v-model="examName" placeholder="Name" />
          </label>
        </div>
        <div class="ml-6">
          <div class="label-line">Duration</div>
          <label>
            <input
              class="dark:bg-gray-800 rounded w-16 mt-2"
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
              class="dark:bg-gray-800 rounded mt-2 ml-3 w-16"
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
            <div class="label-line">Attempts</div>
            <input
              class="dark:bg-gray-800 rounded w-16 mt-2"
              type="number"
              name=""
              id="minutes"
              min="1"
              max="5"
              v-model.number="maxAttempts"
            />
          </label>
        </div>
      </div>
      <div class="mt-4">
        <div class="label">Exam Items</div>
        <div
          v-for="(examItem, i) in examItems"
          :key="i"
          class="mt-2 flex bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden"
        >
          <div class="dark:bg-gray-900 p-3 dark:bg-opacity-50 dark:text-gray-400 font-thin">
            {{ i + 1 }}
          </div>
          <div class="p-3 flex-grow">
            <div>
              <div class="flex items-center justify-between">
                <label for="question">
                  <div class="label">Question</div>
                </label>
                <button
                  class="focus:outline-none text-gray-500 dark:hover:text-white"
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
                class="w-full mt-2"
                v-model="examItem.question"
                placeholder="Question"
              />
            </div>
            <div class="mt-4">
              <label>
                <div class="label">Answer</div>
                <BaseInput
                  class="w-full mt-2"
                  v-model="examItem.answer"
                  placeholder="Answer"
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
        <div class="flex mt-4">
          <div>
            <BaseButton @click="addExamItem">Add Exam Item</BaseButton>
          </div>
          <div class="ml-2">
            <BaseButton @click="saveExam">Save Exam</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import examsService from '@/services/exams'
import { ALERT } from '@/store/action-types'
import { ADD_EXAM } from '@/store/mutation-types'
import { Course, NewExam, Option, QuestionType } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseInput, BaseButton },
  name: 'ExamCreationPage',
  data () {
    return {
      examName: '',
      examHours: 1,
      examMinutes: 1,
      maxAttempts: 3,
      examItems: [
        {
          question: '',
          questionType: 'text' as QuestionType,
          // questionType: 'text' as
          //   | 'text'
          //   | 'multiple choice'
          //   | 'multiple answers',
          answer: '',
          choices: [] as string[]
        }
      ],
      questionTypes: [
        {
          text: 'Text',
          value: 'text'
        }
        // {
        // text: 'Multiple Choice',
        // value: 'multiple choice'
        // },
        // {
        // text: 'Multiple Answers',
        // value: 'multiple answers'
        // }
      ] as Option[]
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
    addExamItem (): void {
      this.examItems.push({
        question: '',
        questionType: 'text',
        answer: '',
        choices: []
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
          examItems: this.examItems
        }
        const createdExam = await examsService.create(newExam)
        this.$store.commit(ADD_EXAM, createdExam)
      } catch (error) {
        this.$store.dispatch(ALERT, 'oh no i made a fucky wucky UwU')
        console.error(error)
      }
    }
  }
})
</script>

<style lang="postcss" scoped>
.label,
.label-line {
  @apply uppercase text-xs dark:text-gray-400 font-semibold tracking-wide;
}

.label-line {
  @apply pb-1 border-b dark:border-gray-700;
}
</style>
