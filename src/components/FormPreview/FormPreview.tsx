import useFormQuestionStore from '@/stores/FormQuestionStore'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { DevTool } from '@hookform/devtools'

const FormPreview = () => {
  const { questions } = useFormQuestionStore()
  const form = useForm()
  function onSubmit(data: any) {
    toast('Form submitted', {
      description: (
        <div>
          <code>{JSON.stringify(data, null, 2)}</code>
        </div>
      ),
    })
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {questions.map((question) => {
            return (
              <FormField
                key={question.id}
                control={form.control}
                name={`question-${question.id}`}
                render={({ field }) => {
                  if (question.type === 'text') {
                    return (
                      <FormItem>
                        <FormLabel>{question.label}</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your question" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )
                  } else {
                    return (
                      <FormItem>
                        <FormLabel>{question.label}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            {question.options?.map((option) => (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={option} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }
                }}
              />
            )
          })}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <DevTool control={form.control} />
    </>
  )
}

export default FormPreview
