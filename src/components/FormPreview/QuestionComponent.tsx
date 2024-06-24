import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

type QuestionComponentMap = {
  [key: string]: React.FC<{
    question: TInputQuestion
    field: ControllerRenderProps<FieldValues, string>
    runningNumber?: number
  }>
}

const questionComponents: QuestionComponentMap = {
  text: ({ question, field, runningNumber }) => (
    <FormItem>
      <FormLabel>{`${runningNumber}. ${question.label}`}</FormLabel>
      <FormControl>
        <Input placeholder="Enter your answer" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  ),
  multipleChoice: ({ question, field, runningNumber }) => {
    const multipleChoiceQuestion = question as MultipleChoiceQuestion
    return (
      <FormItem>
        <FormLabel>{`${runningNumber}. ${multipleChoiceQuestion.label}`}</FormLabel>
        <FormControl>
          <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
            {multipleChoiceQuestion.options?.map((option, index) => (
              <FormItem
                key={index}
                className="flex items-center space-x-3 space-y-0"
              >
                <FormControl>
                  <RadioGroupItem value={option} />
                </FormControl>
                <FormLabel className="font-normal">{option}</FormLabel>
              </FormItem>
            ))}
          </RadioGroup>
        </FormControl>
        <FormMessage />
      </FormItem>
    )
  },
  // Add more components here as needed
}

export default questionComponents
