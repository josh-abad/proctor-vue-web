<template>
  <div v-if="course" class="p-4">
    <BasePanel class="overflow-hidden">
      <div
        class="-mx-6 -mt-6 p-6 bg-gradient-to-r from-green-600 via-green-500 to-green-400"
      >
        <BaseLabel emphasis class="text-green-400">{{ course.name }}</BaseLabel>
        <div
          class="text-2xl font-bold text-white focus:outline-none"
          contenteditable
          @input="examName = $event.target.innerText"
          v-text="examName"
        ></div>
      </div>
      <div class="mt-4 flex divide-x divide-gray-700">
        <div class="pr-6">
          <label>
            <BaseLabel>Duration</BaseLabel>
            <TimePicker v-model.number="examSeconds" />
          </label>
        </div>
        <div class="px-6">
          <label for="attempts">
            <BaseLabel>Attempts</BaseLabel>
          </label>
          <NumberInput
            v-model.number="maxAttempts"
            :min="1"
            :max="5"
            id="attempts"
          />
        </div>
        <div class="px-6">
          <label for="week">
            <BaseLabel>Week</BaseLabel>
          </label>
          <NumberInput
            v-model.number="week"
            :min="1"
            :max="course.weeks"
            id="week"
          />
        </div>
        <div class="px-6">
          <label for="startDate">
            <BaseLabel>Start Date</BaseLabel>
          </label>
          <DatePicker id="startDate" v-model="startDate" />
        </div>
        <div class="pl-6">
          <label for="endDate">
            <BaseLabel>End Date</BaseLabel>
          </label>
          <DatePicker id="endDate" v-model="endDate" />
        </div>
      </div>
      <div class="mt-4">
        <div>
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
import BaseLabel from '@/components/BaseLabel.vue'
import BasePanel from '@/components/BasePanel.vue'
import DatePicker from '@/components/DatePicker.vue'
import ExamItemInput from '@/components/ExamItemInput.vue'
import NumberInput from '@/components/NumberInput.vue'
import TimePicker from '@/components/TimePicker.vue'
import examsService from '@/services/exams'
import { ALERT } from '@/store/action-types'
import { ADD_EXAM } from '@/store/mutation-types'
import { Course, ExamItem, NewExam, QuestionType } from '@/types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ExamCreationPage',
  components: { BaseButton, BasePanel, BaseLabel, TimePicker, NumberInput, ExamItemInput, DatePicker },
  props: {
    courseId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      examName: 'New Exam',
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
    course (): Course | undefined {
      return this.$store.getters.courseByID(this.courseId)
    }
  },
  methods: {
    addExamItem (i?: number): void {
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
    removeExamItem (index: number): void {
      this.examItems = this.examItems.filter((item, i) => i !== index)
    },
    async saveExam (): Promise<void> {
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

<style lang="postcss" scoped>
.input-number {
  @apply shadow focus:outline-none bg-gray-800 appearance-none rounded-lg px-3 py-2 focus:ring-0 border-gray-700 focus:border-green-500;
}

.fade-enter-active,
.fade-leave-active {
  @apply opacity-100 duration-200 ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
