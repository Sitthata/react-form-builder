import { Label } from '@radix-ui/react-label'
import { Block } from '../Block'
import { Input } from '../ui/input'
import { Switch } from "@/components/ui/switch"

type TextInputBlockProps = {
  id: number
  label: string
  isRequired: boolean
  runningNumber: number
  setQuestionLabel: (index: number, label: string) => void
  setQuestionRequired: (index: number, required: boolean) => void
}

const TextInputBlock = ({
  id,
  label,
  isRequired,
  runningNumber,
  setQuestionLabel,
  setQuestionRequired,
}: TextInputBlockProps) => {
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionLabel(id, e.target.value)
  }
  const handleRequiredChange = () => {
    setQuestionRequired(id, !isRequired)
  }
  return (
    <Block id={id}>
      {(isEditing) => (
        <div>
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <h1 className="flex items-center space-x-2">
                <span>{runningNumber}.</span>
                <Input
                  className="group-hover:border-white"
                  value={label}
                  onChange={handleLabelChange}
                />
              </h1>
              <hr />
              <div className="flex justify-end">
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
