<template>
  <div>
    <BasePanel>
      <div class="text-xl">Create New Exam for {{ course.name }}</div>
      <div class="flex mt-3">
        <div>
          <label>
            <BaseLabel>Name</BaseLabel>
            <BaseInput v-model="examName" type="text" />
          </label>
        </div>
        <div class="ml-6">
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
      </div>
      <div class="mt-4">
        <BaseLabel emphasis>Exam Items</BaseLabel>
        <div
          v-for="(examItem, i) in examItems"
          :key="i"
          class="flex bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden mb-4"
        >
          <div class="bg-gray-300 dark:bg-gray-900 p-3 bg-opacity-50 dark:bg-opacity-50 dark:text-gray-400 font-thin">
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
  <div v-else class="fixed inset-0">
    <div class="flex justify-center items-center">
      <Center />
      <div class="flex flex-col items-center">
        <div class="font-thin text-2xl">No no you not allowed yes</div>
        <BaseButton class="mt-3">Go back</BaseButton>
      </div>
    </div>
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
import { Course, NewExam, Option, QuestionType } from '@/types'
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
        this.$store.dispatch(ALERT, 'Exam successfully created')
        this.$router.push(`/courses/${this.courseId}`)
      } catch (error) {
        this.$store.dispatch(ALERT, 'Failed to create exam')
      }
    }
  }
})
</script>
