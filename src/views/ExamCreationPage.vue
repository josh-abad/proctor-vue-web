<template>
  <div>
    <div class="bg-gray-100 dark:bg-gray-800 px-4 py-6 rounded-lg shadow">
      <div>Create New Exam for {{ course.name }}</div>
      <div>
        <label>
          Exam Name
          <BaseInput v-model="examName" placeholder="Name" />
        </label>
      </div>
      <div>
        <label>
          Exam Duration
          <BaseInput v-model.number="examDuration" placeholder="Duration" />
        </label>
      </div>
      <div>
        <label>
          Maximum Attempts
          <BaseInput
            v-model.number="maxAttempts"
            placeholder="Maximum Attempts"
          />
        </label>
      </div>
      <div>
        Exam Items
        <div
          v-for="(examItem, i) in examItems"
          :key="i"
          class="mt-3 bg-white dark:bg-gray-700 px-5 py-8 rounded-lg shadow-md"
        >
          <div>
            {{ i + 1 }}
          </div>
          <div>
            <label>
              Question
              <BaseInput v-model="examItem.question" placeholder="Question" />
            </label>
          </div>
          <div>
            <label>
              Answer
              <BaseInput
                v-model="examItem.correctAnswer"
                placeholder="Answer"
              />
            </label>
          </div>
          <div>
            <label>
              Question Type
              <BaseDropdown v-model="examItem.questionType" :options="questionTypes" />
            </label>
          </div>
          <div>
            <BaseButton label="Remove" @click="removeExamItem(i)" />
          </div>
        </div>
        <div class="flex mt-4">
          <div>
            <BaseButton label="Add Exam Item" @click="addExamItem" />
          </div>
          <div class="ml-2">
            <BaseButton label="Save Exam" @click="saveExam" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import BaseDropdown from '@/components/BaseDropdown.vue'
import BaseInput from '@/components/BaseInput.vue'
import examItemsService from '@/services/exam-items'
import examsService from '@/services/exams'
import { ALERT } from '@/store/action-types'
import { ADD_EXAM } from '@/store/mutation-types'
import { Course, ExamItem, NewExam, NewExamItem, Option } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: { BaseInput, BaseButton, BaseDropdown },
  name: 'ExamCreationPage',
  data () {
    return {
      examName: '',
      examDuration: 3600,
      maxAttempts: 3,
      examItems: [
        {
          question: '',
          questionType: 'text' as 'text' | 'multiple choice' | 'multiple answers',
          correctAnswer: '',
          choices: []
        }
      ],
      questionTypes: [
        {
          text: 'Text',
          value: 'text'
        },
        {
          text: 'Multiple Choice',
          value: 'multiple choice'
        },
        {
          text: 'Multiple Answers',
          value: 'multiple answers'
        }
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
    course (): Course {
      return this.$store.getters.getCourseByID(this.courseId)
    }
  },
  methods: {
    addExamItem (): void {
      this.examItems.push({
        question: '',
        questionType: 'text',
        correctAnswer: '',
        choices: []
      })
    },
    removeExamItem (index: number): void {
      this.examItems = this.examItems.filter((item, i) => i !== index)
    },
    // This is gonna be a fucking mess
    async saveExam (): Promise<void> {
      try {
        const examQuestions: ExamItem[] = []
        for (const item of this.examItems) {
          const newExamItem: NewExamItem = {
            question: item.question,
            examType: item.questionType,
            choices: item.choices,
            courseId: this.courseId,
            answer: item.correctAnswer
          }
          examQuestions.push(await examItemsService.create(newExamItem))
        }

        const newExam: NewExam = {
          label: this.examName,
          random: false,
          length: this.examItems.length,
          duration: this.examDuration,
          courseId: this.courseId,
          maxAttempts: this.maxAttempts,
          questionIds: examQuestions.map(question => question.id) as string[]
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
