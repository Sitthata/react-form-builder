import { DragAndDropContainer } from '@/components/DragAndDrop'
import { TextInputBlock } from '@/components/FormBuilder'
import MultipleChoiceBlock from '@/components/FormBuilder/MultipleChoiceBlock'
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

const FormBuilderPage = () => {
  const questionType = [
    { label: 'Text', value: 'text' },
    { label: 'Choice', value: 'multipleChoice' },
  ]
  const { questions, addQuestion, updateQuestion, setQuestions } =
    useFormQuestionStore()
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
    if (type === 'text') {
      addQuestion({
        id: questions.length + 1,
        type: 'text',
        label: 'Untitled Question',
        required: false,
      })
    } else if (type === 'multipleChoice') {
      addQuestion({
        id: questions.length + 1,
        type: 'multipleChoice',
        label: 'Untitled Question',
        required: false,
        multipleChoose: { status: false },
        options: ['Option 1', 'Option 2'],
      })
    }
  }
  return (
    <div className="flex flex-col gap-2">
      <DragAndDropContainer
        items={questions}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        {questions.map((question, index) => {
          if (question.type === 'text') {
            return (
              <TextInputBlock
                key={index}
                question={question as TextInputQuestion}
                updateQuestion={updateQuestion}
                runningNumber={index + 1}
              />
            )
          } else if (question.type === 'multipleChoice') {
            return (
              <MultipleChoiceBlock
                key={index}
                question={question as MultipleChoiceQuestion}
                runningNumber={index + 1}
                updateQuestion={updateQuestion}
              />
            )
          }
          return null
        })}
      </DragAndDropContainer>
      <div>
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
      </div>
    </div>
  )
}

export default FormBuilderPage
