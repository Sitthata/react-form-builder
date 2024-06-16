import { Form, FormField } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import InputQuestion from './InputQuestion'
import { useState } from 'react'

type FormValues = {
  [key: string]: string
}

export type TInputQuestion = {
  label: string
  name: string
  placeholder: string
}

const inputQuestionsData: TInputQuestion[] = [
  {
    label: 'What is your name?',
    name: 'text',
    placeholder: 'John Doe',
  },
]

const DynamicForm = () => {
  const form = useForm()

  const [inputQuestions, setInputQuestions] =
    useState<TInputQuestion[]>(inputQuestionsData)

  const setQuestionLabel = (index: number, label: string) => {
    setInputQuestions((prev) => {
      const newQuestions = [...prev]
      newQuestions[index].label = label
      return newQuestions
    })
  }

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {inputQuestions.map((question, index) => (
          <FormField
            key={index}
            control={form.control}
            name={question.name}
            render={({ field }) => (
              <InputQuestion
                index={index}
                label={question.label}
                placeholder={question.placeholder}
                field={field}
                setQuestionLabel={setQuestionLabel}
              />
            )}
          />
        ))}
      </form>
      <Button className="mt-4" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default DynamicForm
