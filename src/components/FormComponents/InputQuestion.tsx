import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../ui/input'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type InputQuestionProps = {
  index: number
  label: string
  placeholder: string
  description?: string
  field: ControllerRenderProps<FieldValues, string>
  setQuestionLabel: (index: number, label: string) => void
} & React.HTMLAttributes<HTMLDivElement>

const InputQuestion = ({
  index,
  label,
  placeholder,
  field,
  description,
  setQuestionLabel,
}: InputQuestionProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          callback()
        }
      }

      document.addEventListener('click', handleClick)

      return () => {
        document.removeEventListener('click', handleClick)
      }
    }, [callback, ref])
    return ref
  }

  const blockRef = useOutsideClick(() => setIsEditing(false))

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionLabel(index, e.target.value)
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={cn(
        'group cursor-pointer rounded-lg p-5 transition-colors duration-300 hover:bg-gray-800',
        {
          'bg-gray-600': isEditing,
        }
      )}
      ref={blockRef}
    >
      {isEditing ? (
        <Input
          className="group-hover:border-white"
          placeholder="Question Name"
          onChange={handleInputChange}
        />
      ) : (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className="group-hover:border-white"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    </div>
  )
}

export default InputQuestion
