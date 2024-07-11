import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router'
import DialogComponent from '../Dialog/DialogComponent'
import useDialog from '../Dialog/useDialog'
import FormCardEdit from './FormCardEdit'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'

type FormCardProps = {
  form: TForm
}

const FormCard = ({ form }: FormCardProps) => {
  const { title, createdAt: time, status, description } = form
  const navigate = useNavigate()
  const handleFormClick = () => {
    navigate(`/editor`)
  }
  const { isOpen, setIsOpen, openDialog, closeDialog } = useDialog()
  const [openAlertDialog, setOpenAlertDialog] = useState(false)

  const handleAlertOpen = () => {
    setOpenAlertDialog(true)
    closeDialog()
  }

  return (
    <>
      <Card
        className="relative flex h-full cursor-pointer flex-col rounded-lg"
        onClick={openDialog}
      >
        <CardHeader>
          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{time}</CardDescription>
            </div>
            <div>
              <Badge className="p-1">{status}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p
            className={cn('text-sm font-light text-accent-foreground', {
              italic: !description,
            })}
          >
            {description ? description : 'No description provided'}
          </p>
        </CardContent>
        <CardFooter className="mt-auto">
          <Button onClick={handleFormClick} className="w-full">
            View Survey
          </Button>
        </CardFooter>
      </Card>
      <DialogComponent
        isOpen={isOpen}
        openDialog={setIsOpen}
        dialogTitle={`Edit this form`}
        dialogDescription={description}
        children={
          <FormCardEdit openAlertDialog={handleAlertOpen} form={form} />
        }
      />
      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default FormCard
