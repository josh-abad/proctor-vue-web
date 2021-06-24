import coursesService from '@/services/courses'
import { Exam } from '@/types'
import { ref } from 'vue'

const exam = ref<Exam>()
const isLoading = ref(false)
const hasError = ref(false)

export default function useExam(courseSlug: string, examSlug: string) {
  const fetchExam = async () => {
    try {
      isLoading.value = true
      exam.value = await coursesService.getExam(courseSlug, examSlug)
    } catch (error) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return { exam, fetchExam, isLoading, hasError }
}
