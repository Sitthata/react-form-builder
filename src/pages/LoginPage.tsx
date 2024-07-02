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

const formSchema = z.object({
  email: z.string().email({
    message: 'Invalid email',
  }),
  password: z.string()
})

type formDataType = {
  label: string
  name: 'email' | 'password'
  placeHolder: string
  type: string
}

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { login } = useAuth()
  const navigate = useNavigate()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await login(values.email, values.password)
      toast.success('Login successful')
      return navigate('/dashboard')
    } catch (error: any) {
      toast.error('Login failed', {
        description: error.message,
      })
    }
  }
  const formData: formDataType[] = [
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
  ]
  return (
    <section className="flex min-h-[80vh] items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                Login
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
        <DevTool control={form.control} />
      </Card>
    </section>
  )
}

export default LoginPage
