import React, { useEffect, useState } from 'react'

import { Label } from '@radix-ui/react-label'
import { Block } from '../Block'
import { Input } from '../ui/input'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { RiDeleteBin5Line } from 'react-icons/ri'

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
      status: !localQuestion.status,
      multipleType: 'noLimit',
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

  function handleDeleteOption(index: number) {
    if (!localQuestion.options) return
    setLocalQuestion({
      ...localQuestion,
      options: localQuestion.options.filter((_, i) => i !== index),
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
              {localQuestion.status ? (
                <div className="flex flex-col gap-2">
                  {localQuestion.options?.map((option, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <Checkbox id={option} />
                      <div className="flex w-3/4 gap-2">
                        <Input
                          className="w-full group-hover:border-white"
                          value={option}
                          onChange={(e) => handleOptionsChange(index, e)}
                        />
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleDeleteOption(index)}
                        >
                          <RiDeleteBin5Line />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <RadioGroup disabled>
                  {localQuestion.options?.map((option, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <RadioGroupItem value={option} />
                      <div className="flex w-3/4 gap-2">
                        <Input
                          className="w-full group-hover:border-white"
                          value={option}
                          onChange={(e) => handleOptionsChange(index, e)}
                        />
                        <Button size="icon" variant="outline">
                          <RiDeleteBin5Line />
                        </Button>
                      </div>
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
                    checked={localQuestion.status}
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
              {localQuestion.status ? (
                <div className="flex flex-col gap-2">
                  {localQuestion.options?.map((option, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <Checkbox id={option} />
                      <Label>{`${option}`}</Label>
                    </div>
                  ))}
                </div>
              ) : (
                <RadioGroup disabled>
                  {localQuestion.options?.map((option, index) => (
                    <div className="flex items-center space-x-2" key={index}>
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
