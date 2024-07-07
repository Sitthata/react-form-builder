import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/auth/AuthContext'
import { toast } from 'sonner'
import { DevTool } from '@hookform/devtools'

const formSchema = z
  .object({
    username: z.string().min(3, {
      message: 'Username must be at least 3 characters long',
    }),
    email: z.string().email({
      message: 'Invalid email',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    password_confirm: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: 'Passwords do not match',
    path: ['password_confirm'],
  })

type formValidationType = z.infer<typeof formSchema>

type formDataType = {
  label: string
  name: 'email' | 'password' | 'password_confirm' | 'username'
  placeHolder: string
  type: string
}

const LoginPage = () => {
  const form = useForm<formValidationType>({
    resolver: zodResolver(formSchema),
  })
  const { signup } = useAuth()
  const navigate = useNavigate()

  async function onSubmit(values: formValidationType) {
    await signup(values.username, values.email, values.password)
    navigate('/login')
    toast(<code>{JSON.stringify(values, null, 2)}</code>)
  }
  const formData: formDataType[] = [
    {
      label: 'Username',
      name: 'username',
      placeHolder: 'Your Name',
      type: 'text',
    },
    {
      label: 'Email',
      name: 'email',
      placeHolder: 'example@email.com',
      type: 'email',
    },
    {
      label: 'Password',
      name: 'password',
      placeHolder: 'Your Password',
      type: 'password',
    },
    {
      label: 'Confirm Password',
      name: 'password_confirm',
      placeHolder: 'Confirm Password',
      type: 'password',
    },
  ]
  return (
    <section className="flex min-h-[80vh] items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Let's get started! Create an account to access all the features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              {formData.map((data, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={data.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{data.label}</FormLabel>
                      <FormControl>
                        <Input
                          type={data.type}
                          placeholder={data.placeHolder}
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" className="mt-4 w-full">
                Sign Up
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
        <DevTool control={form.control} />
      </Card>
    </section>
  )
}

export default LoginPage
