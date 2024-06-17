import { TextInputBlock } from '@/components/FormBuilder'
import { DynamicForm } from '@/components/FormComponents'
import { useState } from 'react'

const inputQuestionsData: TInputQuestion[] = [
  {
    label: 'What is your name?',
    name: 'text',
    placeholder: 'John Doe',
  },
  {
    label: 'What is your favorite Food?',
    name: 'text',
    placeholder: 'John Doe',
  },
]

const FormBuilderPage = () => {
  const [questions, setQuestions] =
    useState<TInputQuestion[]>(inputQuestionsData)
  const setQuestionLabel = (index: number, label: string) => {
    setQuestions((prev) => {
      const newQuestions = [...prev]
      newQuestions[index].label = label
      return newQuestions
    })
  }
  return (
    <div>
      <DynamicForm />
      <div className='flex flex-col gap-2'>
        {questions.map((question, index) => (
          <TextInputBlock
            key={index}
            index={index}
            label={question.label}
            runningNumber={index + 1}
            setQuestionLabel={setQuestionLabel}
          />
        ))}
      </div>
    </div>
  )
}

export default FormBuilderPage
