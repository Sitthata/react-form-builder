import React, { useEffect, useState } from 'react'

import { Label } from '@radix-ui/react-label'
import { Block } from '../Block'
import { Input } from '../ui/input'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type TextInputBlockProps = {
  question: MultipleChoiceQuestion
  runningNumber: number
  updateQuestion: (
    id: number,
    updatedFields: Partial<MultipleChoiceQuestion>
  ) => void
}

const TextInputBlock = ({
  question,
  runningNumber,
  updateQuestion,
}: TextInputBlockProps) => {
  const [localQuestion, setLocalQuestion] =
    useState<MultipleChoiceQuestion>(question)

  useEffect(() => {
    updateQuestion(localQuestion.id, localQuestion)
  }, [localQuestion, updateQuestion])

  function handleLabelChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalQuestion({ ...localQuestion, label: e.target.value })
  }

  function handleRequiredChange() {
    setLocalQuestion({ ...localQuestion, required: !localQuestion.required })
  }

  function handleAddOptions() {
    if (!localQuestion.options) {
      setLocalQuestion({ ...localQuestion, options: [] })
      return
    }
    setLocalQuestion({
      ...localQuestion,
      options: [
        ...localQuestion.options,
        `Option ${localQuestion.options.length + 1}`,
      ],
    })
  }

  function handleMultipleChooseChange() {
    setLocalQuestion({
      ...localQuestion,
      multipleChoose: {
        status: !localQuestion.multipleChoose?.status,
        type: 'noLimit',
      },
    })
  }

  function handleOptionsChange(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!localQuestion.options) return
    setLocalQuestion({
      ...localQuestion,
      options: localQuestion.options.map((option, i) =>
        i === index ? e.target.value : option
      ),
    })
  }

  return (
    <Block id={localQuestion.id}>
      {(isEditing) => (
        <div>
          {isEditing ? (
            <div className="flex flex-col gap-5">
              <h1 className="flex items-center space-x-2">
                <span>{runningNumber}.</span>
                <Input
                  className="group-hover:border-white"
                  value={localQuestion.label}
                  onChange={handleLabelChange}
                />
              </h1>
              {localQuestion.multipleChoose?.status ? (
                <div className="flex flex-col gap-2">
                  {localQuestion.options?.map((option, index) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox id={option} />
                      <Input
                        className="group-hover:border-white"
                        value={option}
                        onChange={(e) => handleOptionsChange(index, e)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <RadioGroup disabled>
                  {localQuestion.options?.map((option, index) => (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option} />
                      <Input
                        className="group-hover:border-white"
                        value={option}
                        onChange={(e) => handleOptionsChange(index, e)}
                      />
                    </div>
                  ))}
                </RadioGroup>
              )}
              <Button className="w-[180px]" onClick={handleAddOptions}>
                + Add Option
              </Button>
              <hr />
              <div className="flex justify-end gap-5">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={localQuestion.multipleChoose?.status}
                    onCheckedChange={handleMultipleChooseChange}
                  />
                  <Label>Multiple answers</Label>
                </div>
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
              {localQuestion.multipleChoose?.status ? (
                <div className="flex flex-col gap-2">
                  {localQuestion.options?.map((option) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox id={option} />
                      <Label>{`${option}`}</Label>
                    </div>
                  ))}
                </div>
              ) : (
                <RadioGroup disabled>
                  {localQuestion.options?.map((option) => (
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={option} />
                      <Label>{`${option}`}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          )}
        </div>
      )}
    </Block>
  )
}

export default TextInputBlock
