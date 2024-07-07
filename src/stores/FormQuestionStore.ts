import { createArrayManager } from '@/lib/utils'
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
  function refresh() {
    set({ questions: arrayManager.getArray() })
  }
  return {
    // State
    questions: arrayManager.getArray(),

    // Actions
    addQuestion: (question) => {
      arrayManager.push(question)
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
