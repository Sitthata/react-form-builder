import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
  formTitle: z.string().min(4, {
    message: 'Username must be at least 4 characters.',
  }),
  formDescription: z.string().max(100, {
    message: 'Description must be less than 100 characters.',
  }),
})

type FormCardEditProps = {
  form: TForm 
  openAlertDialog: () => void
}

const FormCardEdit = ({ form: formData, openAlertDialog }: FormCardEditProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formTitle: '',
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="formTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Form Title</FormLabel>
                <FormControl>
                  <Input placeholder={formData.title} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="formDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Form Description</FormLabel>
                <FormControl>
                  <Textarea placeholder={formData.description} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-2 pt-3">
            <Button type="button" onClick={openAlertDialog} variant="destructive">
              Delete
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </>
  )
}

export default FormCardEdit
