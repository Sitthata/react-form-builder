import { addQuestion, updateQuestion } from '@/api/questionsService'
import { createArrayManager } from '@/lib/utils'
import { debounce } from 'lodash'
import { create } from 'zustand'

interface FormQuestionState {
  questions: TInputQuestion[]
  addQuestion: (question: TInputQuestion) => void
  updateQuestion: (id: number, question: Partial<TInputQuestion>) => void
  removeQuestion: (id: number) => void
  setQuestions: (questions: TInputQuestion[]) => void
}
const useFormQuestionStore = create<FormQuestionState>((set) => {
  const arrayManager = createArrayManager<TInputQuestion>([])
  const debouncedSaveMap = new Map()
  function refresh() {
    set({ questions: arrayManager.getArray() })
  }
  function getDebouncedSave(id: number) {
    if (!debouncedSaveMap.has(id)) {
      const debouncedSave = debounce(async (question) => {
        try {
          await updateQuestion(question.id, question)
          console.log('Saved question:', question)
        } catch (error) {
          console.error('Error saving question:', error)
        }
      }, 2000)

      debouncedSaveMap.set(id, debouncedSave)
    }
    return debouncedSaveMap.get(id)
  }
  return {
    // State
    questions: arrayManager.getArray(),

    // Actions
    addQuestion: async (question) => {
      arrayManager.push(question)
      await addQuestion(question)
      refresh()
    },

    updateQuestion: (id, updatedQuestion) => {
      const index = arrayManager
        .getArray()
        .findIndex((question) => question.id === id)
      if (index !== -1) {
        const existingQuestion = arrayManager.getArray()[index]
        if (
          existingQuestion.type === 'multipleChoice' &&
          updatedQuestion.type &&
          updatedQuestion.type !== 'multipleChoice'
        ) {
          throw new Error('Type mismatch')
        }
        arrayManager.update(index, {
          ...existingQuestion,
          ...updatedQuestion,
          type: existingQuestion.type,
        })
        refresh()
        getDebouncedSave(id)(arrayManager.getArray()[index])
      }
    },

    removeQuestion: (id) => {
      const index = arrayManager.getArray().findIndex((b) => b.id === id)
      if (index !== -1) {
        arrayManager.remove(index)
        refresh()
      }
    },

    setQuestions: (questions) => {
      arrayManager.setArray(questions)
      refresh()
    },
  }
})

export default useFormQuestionStore
