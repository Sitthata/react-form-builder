import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ReactNode } from 'react'

type DialogComponentProps = {
  dialogTitle: string
  dialogDescription?: string
  isOpen: boolean
  openDialog: (open: boolean) => void
  children?: ReactNode
  footer?: ReactNode
}

const DialogComponent = ({
  dialogTitle: title,
  dialogDescription: description,
  children,
  footer,
  isOpen,
  openDialog,
}: DialogComponentProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={openDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogComponent
