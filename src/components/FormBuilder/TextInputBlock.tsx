import { Label } from '@radix-ui/react-label'
import { Block } from '../Block'
import { Input } from '../ui/input'
import { Switch } from '@/components/ui/switch'
import { useEffect, useState } from 'react'

type TextInputBlockProps = {
  question: TextInputQuestion
  runningNumber: number
  updateQuestion: (
    id: number,
    updatedFields: Partial<TextInputQuestion>
  ) => void
}

const TextInputBlock = ({
  question,
  runningNumber,
  updateQuestion,
}: TextInputBlockProps) => {
  const [localQuestion, setLocalQuestion] =
    useState<TextInputQuestion>(question)

  useEffect(() => {
    updateQuestion(localQuestion.id, localQuestion)
  }, [localQuestion, updateQuestion])

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuestion({ ...localQuestion, label: e.target.value })
  }
  const handleRequiredChange = () => {
    setLocalQuestion({ ...localQuestion, required: !localQuestion.required })
  }
  return (
    <Block id={question.id}>
      {(isEditing) => (
        <div>
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <h1 className="flex items-center space-x-2">
                <span>{runningNumber}.</span>
                <Input
                  className="group-hover:border-white"
                  value={localQuestion.label}
                  onChange={handleLabelChange}
                />
              </h1>
              <hr />
              <div className="flex justify-end">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={localQuestion.required}
                    onCheckedChange={handleRequiredChange}
                  />
                  <Label>Required</Label>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Label className="text-sm">{`${runningNumber}. ${localQuestion.label}`}</Label>
              <Input
                className="group-hover:border-white"
                type="text"
                placeholder={'Question ' + runningNumber}
              />
            </div>
          )}
        </div>
      )}
    </Block>
  )
}

export default TextInputBlock
