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

const AddNewForm = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex min-h-[188px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg shadow-md outline outline-1 outline-accent">
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
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Form name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Description</Label>
              <Input id="name" placeholder="Description" />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button>Create Form</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// const AddNewCard = () => {
//   return (
//     <div className="flex min-h-[10.725rem] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg shadow-md outline outline-1 outline-accent">
//       <IoMdDocument />
//       Create New Form
//     </div>
//   )
// }

export default AddNewForm
