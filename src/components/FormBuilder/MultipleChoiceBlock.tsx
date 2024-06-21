import { useState } from 'react'

import { Label } from '@radix-ui/react-label'
import { Block } from '../Block'
import { Input } from '../ui/input'
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


type TextInputBlockProps = {
  id: number
  label: string
  isRequired: boolean
  multipleChoose: TMultipleChoose
  selected: number
  options: string[]
  runningNumber: number
  setQuestionLabel: (index: number, label: string) => void
  setQuestionRequired: (index: number, required: boolean) => void
  setQuestionOptions: (index: number, options: string[]) => void
  setQuestionMultipleChoose: (index: number, multipleChoose: boolean) => void
  setQuestionSelected: (index: number, selected: number) => void
}

const TextInputBlock = ({
  id,
  label,
  isRequired,
  multipleChoose,
  selected,
  options,
  runningNumber,
  setQuestionLabel,
  setQuestionRequired,
  setQuestionOptions,
  setQuestionMultipleChoose,
  setQuestionSelected,
}: TextInputBlockProps) => {
  const [open, setOpen] = useState(false)
  const multipleOptions = ['No limit', 'Equal to', 'At most']
  const handleOpenSelect = () => {
    setOpen(true)
  }
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionLabel(id, e.target.value)
  }
  const handleRequiredChange = () => {
    setQuestionRequired(id, !isRequired)
  }
  const handleAddOptions = () => {
    setQuestionOptions(id, [...options, `Option ${options.length + 1}`])
  }
  const handleOptionsChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionOptions(id, options.map((o, i) => i === index ? e.target.value : o))
  }
  const handleMultipleChooseChange = () => {
    setQuestionMultipleChoose(id, !multipleChoose.status)
  }
  return (
    <Block id={id}>
      {(isEditing) => (
        <div>
          {isEditing ? (
            <div className="flex flex-col gap-5">
              <h1 className="flex items-center space-x-2">
                <span>{runningNumber}.</span>
                <Input
                  className="group-hover:border-white"
                  value={label}
                  onChange={handleLabelChange}
                />
              </h1>
              {multipleChoose.status ? (
                <div className="flex flex-col gap-2">
                  {options.map((option, index) => (
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
                  {options.map((option, index) => (
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
              <Button 
                className="w-[180px]" 
                onClick={handleAddOptions}
              >+ Add Option</Button>
              <hr />
              <div className="flex justify-end gap-5">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={multipleChoose.status}
                    onCheckedChange={handleMultipleChooseChange}
                  />
                  <Label>Multiple answers</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={isRequired}
                    onCheckedChange={handleRequiredChange}
                  />
                  <Label>Required</Label>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Label className="text-sm">{`${runningNumber}. ${label}`}</Label>
              {multipleChoose.status ? (
                <div className="flex flex-col gap-2">
                  {options.map((option) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox id={option} />
                      <Label>{`${option}`}</Label>
                    </div>
                  ))}
                </div>
              ) : (
                <RadioGroup disabled>
                  {options.map((option) => (
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
      )
      }
    </Block >
  )
}

export default TextInputBlock
