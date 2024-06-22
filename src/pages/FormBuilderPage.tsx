import { DragAndDropContainer } from '@/components/DragAndDrop'
import { TextInputBlock } from '@/components/FormBuilder'
import MultipleChoiceBlock from '@/components/FormBuilder/MultipleChoiceBlock'
import { EditModeProvider } from '@/context/EditModeContext'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
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

  function updateQuestion(id: number, updateField: Partial<TInputQuestion>) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updateField } : q))
    )
  }
  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      setQuestions((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }
  return (
    <EditModeProvider>
      <div className="flex flex-col gap-2">
        <DragAndDropContainer items={questions} onDragEnd={handleDragEnd}>
          {questions.map((question, index) => {
            if (question.type === 'text') {
              return (
                <TextInputBlock
                  key={question.id}
                  question={question as TextInputQuestion}
                  updateQuestion={updateQuestion}
                  runningNumber={index + 1}
                />
              )
            } else if (question.type === 'multipleChoice') {
              return (
                <MultipleChoiceBlock
                  key={question.id}
                  question={question as MultipleChoiceQuestion}
                  runningNumber={index + 1}
                  updateQuestion={updateQuestion}
                />
              )
            }
            return null
          })}
        </DragAndDropContainer>
      </div>
    </EditModeProvider>
  )
}

export default FormBuilderPage
