import { DragAndDropContainer } from '@/components/DragAndDrop'
import { useEditMode } from '@/context/EditModeContext'
import { arrayMove } from '@dnd-kit/sortable'
import useFormQuestionStore from '@/stores/FormQuestionStore'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import QuestionRenderer from '@/components/FormBuilder/QuestionRenderer'
import { Link } from 'react-router-dom'
import { fetchQuestions, updateQuestion } from '@/api/questionsService'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { toast } from 'sonner'

const FormBuilderPage = () => {
  const questionType = [
    { label: 'Text', value: 'text' },
    { label: 'Choice', value: 'multipleChoice' },
  ]
  // const { questions, addQuestion, setQuestions } = useFormQuestionStore()
  const [questions, setQuestions] = useState<TInputQuestion[] | []>([])
  const { setEditingId } = useEditMode()

  const { data, isLoading, isError, isSuccess } = useQuery<TInputQuestion[]>({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  })

  useEffect(() => {
    if (isSuccess) {
      setQuestions(data)
      console.log(questions)
    }
  }, [data, isSuccess])

  const debouncedSave = useCallback(
    debounce(async (question) => {
      try {
        await updateQuestion(question.id, question)

        toast('Questions saved')
      } catch (error) {
        console.error('Error saving questions:', error)
      }
    }, 2000), // 1000ms debounce delay
    []
  )
  useEffect(() => {
    if (questions.length > 0) {
      questions.forEach((question) => {
        debouncedSave(question)
      })
    }
  }, [questions, debouncedSave])

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = questions.findIndex((item) => item.id === active.id)
      const newIndex = questions.findIndex((item) => item.id === over.id)
      setQuestions(arrayMove(questions, oldIndex, newIndex))
    }
  }

  function handleDragStart() {
    setEditingId(null)
  }

  function handleAddQuestion(type: string) {
    // if (type === 'text') {
    //   addQuestion({
    //     id: questions.length + 1,
    //     type: 'text',
    //     label: 'Untitled Question',
    //     required: false,
    //   })
    // } else if (type === 'multipleChoice') {
    //   addQuestion({
    //     id: questions.length + 1,
    //     type: 'multipleChoice',
    //     label: 'Untitled Question',
    //     required: false,
    //     multipleChoose: { status: false },
    //     options: ['Option 1', 'Option 2'],
    //   })
    // }
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Something went wrong</p>
  return (
    <div className="flex flex-col gap-2">
      {/* <Autosave data={questions} onSave={handleSave} /> */}
      <DragAndDropContainer
        items={questions}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        {questions.map((question, index) => (
          <QuestionRenderer question={question} index={index} key={index} />
        ))}
      </DragAndDropContainer>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>+ Add Button</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {questionType.map((type, index) => (
              <DropdownMenuItem
                onClick={() => handleAddQuestion(type.value)}
                key={index}
              >
                {type.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline" asChild>
          <Link to="/preview">Preview</Link>
        </Button>
      </div>
    </div>
  )
}

export default FormBuilderPage
