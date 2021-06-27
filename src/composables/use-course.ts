import coursesService from '@/services/courses'
import { CourseWithExams } from '@/types'
import { ref } from 'vue'

const course = ref<CourseWithExams>()
const isLoading = ref(false)
const hasError = ref(false)

export default function useCourse(courseSlug: string) {
  const fetchCourse = async () => {
    try {
      isLoading.value = true
      course.value = await coursesService.getCourse(courseSlug)
    } catch (error) {
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  return { course, fetchCourse, isLoading, hasError }
}
