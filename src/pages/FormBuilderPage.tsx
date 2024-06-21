import { TextInputBlock } from '@/components/FormBuilder'
import MultipleChoiceBlock from '@/components/FormBuilder/MultipleChoiceBlock'
// import { DynamicForm } from '@/components/FormComponents'
import { EditModeProvider } from '@/context/EditModeContext'
import { useState } from 'react'

const inputQuestionsData: TInputQuestion[] = [
  {
    id: 1,
    type: 'text',
    label: 'What is your name?',
    required: true,
  },
  {
    id: 2,
    type: 'multipleChoice',
    label: 'What is your favorite color?',
    required: true,
    multipleChoose: { status: false },
    options: ['Red', 'Blue', 'Green', 'Yellow'],
  },
  {
    id: 3,
    type: 'multipleChoice',
    label: 'What is your favorite animals?',
    required: false,
    multipleChoose: { status: true, type: 'noLimit', limit: 2 },
    options: ['Lion', 'Tiger', 'Dog', 'Cat'],
  },
]

const FormBuilderPage = () => {
  const [questions, setQuestions] =
    useState<TInputQuestion[]>(inputQuestionsData)
  const setQuestionLabel = (id: number, label: string) => {
    setQuestions((prev) => {
      const newQuestions = [...prev]
      const currentQuestion = newQuestions.find((q) => q.id === id)
      if (currentQuestion) {
        currentQuestion.label = label
      }
      return newQuestions
    })
  }
  const setQuestionRequired = (id: number, required: boolean) => {
    setQuestions((prev) => {
      const newQuestions = [...prev]
      const currentQuestion = newQuestions.find((q) => q.id === id)
      if (currentQuestion) {
        currentQuestion.required = required
      }
      return newQuestions
    })
  }
  const setQuestionOptions = (id: number, options: string[]) => {
    setQuestions((prev) => {
      const newQuestions = [...prev]
      const currentQuestion = newQuestions.find((q) => q.id === id)
      if (currentQuestion) {
        currentQuestion.options = options
      }
      return newQuestions
    })
  }
  const setQuestionMultipleChoose = (id: number, multipleChoose: boolean) => {
    setQuestions((prev) => {
      const newQuestions = [...prev]
      const currentQuestion = newQuestions.find((q) => q.id === id)
      if (currentQuestion) {
        if (multipleChoose) {
          currentQuestion.multipleChoose = { status: multipleChoose, type: 'noLimit' }
        } else {
          currentQuestion.multipleChoose = { status: multipleChoose }
        }
      }
      return newQuestions
    })
  }
  const setQuestionSelected = (id: number, selected: number) => {
    setQuestions((prev) => {
      const newQuestions = [...prev]
      const currentQuestion = newQuestions.find((q) => q.id === id)
      if (currentQuestion) {
        currentQuestion.selected = selected
      }
      return newQuestions
    })
  }
  return (
    <EditModeProvider>
      <div>
        {/* <DynamicForm /> */}
        <div className="flex flex-col gap-2">
          {questions.map((question, index) => question.type === 'text' ? (
            <TextInputBlock
              key={question.id}
              id={question.id}
              label={question.label}
              isRequired={question.required}
              runningNumber={index + 1}
              setQuestionLabel={setQuestionLabel}
              setQuestionRequired={setQuestionRequired}
            />
          ) : question.type === 'multipleChoice' ? (
            <MultipleChoiceBlock
              key={question.id}
              id={question.id}
              label={question.label}
              isRequired={question.required}
              multipleChoose={question.multipleChoose || false}
              selected={question.selected || 0}
              options={question.options || []}
              runningNumber={index + 1}
              setQuestionLabel={setQuestionLabel}
              setQuestionRequired={setQuestionRequired}
              setQuestionOptions={setQuestionOptions}
              setQuestionMultipleChoose={setQuestionMultipleChoose}
              setQuestionSelected={setQuestionSelected}
            />
          ) : null)}
        </div>
      </div>
    </EditModeProvider>
  )
}

export default FormBuilderPage
