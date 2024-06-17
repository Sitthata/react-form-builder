import { Label } from '@radix-ui/react-label'
import { Block } from '../Block'
import { Input } from '../ui/input'

type TextInputBlockProps = {
  index: number
  label: string
  runningNumber: number
  setQuestionLabel: (index: number, label: string) => void
}

const TextInputBlock = ({
  label,
  runningNumber,
  index,
  setQuestionLabel,
}: TextInputBlockProps) => {
  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionLabel(index, e.target.value)
  }
  return (
    <Block>
      {(isEditing) => (
        <div>
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <h1>Edit label</h1>
              <h1 className="flex items-center space-x-2">
                <span>{runningNumber}.</span>
                <Input
                  className="group-hover:border-white"
                  placeholder={label}
                  onChange={handleLabelChange}
                />
              </h1>
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
