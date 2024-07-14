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
import { Link, useParams } from 'react-router-dom'
import { useFetchQuestion } from '@/hooks/useFetchQuestions'
import { useEffect } from 'react'

const questionType = [
  { label: 'Text', value: 'text' },
  { label: 'Choice', value: 'multipleChoice' },
]

const FormBuilderPage = () => {
  const { formId } = useParams()
  
  const { data: questionsData, isSuccess } = useFetchQuestion(Number(formId))

  const { questions, addQuestion, setQuestions } = useFormQuestionStore()
  useEffect(() => {
    if (isSuccess) {
      setQuestions(questionsData.questions)
      console.log(questionsData);
    }
  }, [questionsData, isSuccess, setQuestions])

  const { setEditingId } = useEditMode()

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
    const questionMap: any = {
      text: {
        id: questions.length + 1,
        type: 'text',
        label: 'Untitled Question',
        required: false,
      },
      multipleChoice: {
        id: questions.length + 1,
        type: 'multipleChoice',
        label: 'Untitled Question',
        required: false,
        status: false,
        multipleType: 'noLimit',
        limit: 0,
        options: ['Option 1', 'Option 2'],
      },
    }
    addQuestion(questionMap[type], Number(formId))
  }
  return (
    <div className="flex flex-col gap-2">
      <DragAndDropContainer
        items={questions}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        {questions.map((question, index) => (
          <QuestionRenderer
            question={question}
            index={index}
            key={question.id}
          />
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
