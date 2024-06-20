import { TextInputBlock } from '@/components/FormBuilder'
import { DynamicForm } from '@/components/FormComponents'
import { EditModeProvider } from '@/context/EditModeContext'
import { useState } from 'react'

const inputQuestionsData: TInputQuestion[] = [
  {
    id: 1,
    label: 'What is your name?',
    name: 'text',
    placeholder: 'John Doe',
  },
  {
    id: 2,
    label: 'What is your favorite Food?',
    name: 'text',
    placeholder: 'John Doe',
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
  return (
    <EditModeProvider>
      <div>
        <DynamicForm />
        <div className="flex flex-col gap-2">
          {questions.map((question, index) => (
            <TextInputBlock
              key={question.id}
              id={question.id}
              label={question.label}
              runningNumber={index + 1}
              setQuestionLabel={setQuestionLabel}
            />
          ))}
        </div>
      </div>
    </EditModeProvider>
  )
}

export default FormBuilderPage
