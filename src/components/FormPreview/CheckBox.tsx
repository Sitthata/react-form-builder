import { Checkbox } from '../ui/checkbox'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

type CheckBoxProps = {
  option: string
  field: ControllerRenderProps<FieldValues, string>
}

const CheckBox = ({ option, field }: CheckBoxProps) => {
  const fieldValue = Array.isArray(field.value) ? field.value : []
  return (
    <Checkbox
      checked={field.value?.includes(option)}
      onCheckedChange={(checked) => {
        const newValue = checked
          ? [...fieldValue, option]
          : fieldValue.filter((v) => v !== option)
        field.onChange(newValue)
      }}
    />
  )
}

export default CheckBox
