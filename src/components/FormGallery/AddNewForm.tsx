import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IoMdDocument } from 'react-icons/io'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { usePostForm } from '@/hooks/useFetchForms'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

type TFormData = {
  title: string
  description: string
}

const AddNewForm = () => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<TFormData>()

  const { mutate, error } = usePostForm()
  const queryClient = useQueryClient()
  const [showDialog, setShowDialog] = useState(false)

  const onSubmit = (data: TFormData) => {
    mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['forms'],
        })
        setShowDialog(false)
        toast.success('Form created successfully', {
          description: (
            <div>
              <code>{JSON.stringify(data, null, 2)}</code>
            </div>
          ),
        })
      },
      onError: () => {
        toast.error('Failed to create form')
        console.log(error?.message)
      },
    })
  }

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger>
        <div className="border-1 flex h-full min-h-[188px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-accent shadow-md">
          <IoMdDocument />
          Create New Form
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Form name"
                {...register('title', { required: true })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Description</Label>
              <Input
                id="description"
                placeholder="Description"
                {...register('description', { max: 150 })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddNewForm
