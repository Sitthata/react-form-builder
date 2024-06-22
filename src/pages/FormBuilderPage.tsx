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
  function updateQuestion(id: number, updateField: Partial<TInputQuestion>) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updateField } : q))
    )
  }
  return (
    <EditModeProvider>
      <div>
        {/* <DynamicForm /> */}
        <div className="flex flex-col gap-2">
          {questions.map((question, index) =>
            question.type === 'text' ? (
              <TextInputBlock
                key={question.id}
                id={question.id}
                label={question.label}
                isRequired={question.required}
                runningNumber={index + 1}
              />
            ) : question.type === 'multipleChoice' ? (
              <MultipleChoiceBlock
                key={question.id}
                question={question}
                runningNumber={index + 1}
                updateQuestion={updateQuestion}
              />
            ) : null
          )}
        </div>
      </div>
    </EditModeProvider>
  )
}

export default FormBuilderPage
