import useFormQuestionStore from '@/stores/FormQuestionStore'
import { useForm } from 'react-hook-form'
import { Form, FormField } from '@/components/ui/form'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { DevTool } from '@hookform/devtools'
import questionComponents from './QuestionComponent'
import { Link } from 'react-router-dom'

const FormPreview = () => {
  const { questions } = useFormQuestionStore()
  const form = useForm()
  function onSubmit(data: any) {
    console.log(questions)

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
          {questions.map((question, index) => {
            const Component = questionComponents[question.type]
            return (
              <FormField
                key={question.id}
                control={form.control}
                name={question.id.toString()}
                render={({ field }) => {
                  return (
                    Component && <Component question={question} field={field} runningNumber={index + 1} />
                  )
                }}
              />
            )
          })}
          <div className='flex gap-2'>
            <Button type="submit">Submit</Button>
            <Button variant="outline" asChild>
              <Link to="/editor">Editor</Link>
            </Button>
          </div>
        </form>
      </Form>
      <DevTool control={form.control} />
    </>
  )
}

export default FormPreview
