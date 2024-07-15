import { useEditMode } from '@/context/EditModeContext'
import { cn, mergeRefs } from '@/lib/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ReactNode, useEffect, useRef } from 'react'
import { MdDragHandle } from 'react-icons/md'

type BlockProps = {
  id: number
  children: (isEditing: boolean) => ReactNode
  className?: string
}

const Block = ({ id, children, className, ...props }: BlockProps) => {
  const { editingId, setEditingId } = useEditMode()
  const isEditing = editingId === id
  const useOutsideClick = (callback: () => void) => {
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          callback()
        }
      }
      document.onkeydown = (e) => {
        if (e.key === 'Escape') {
          callback()
        }
      }
      document.addEventListener('click', handleClick)

      return () => {
        document.removeEventListener('click', handleClick)
        document.onkeydown = null
      }
    }, [callback, ref])
    return ref
  }

  const blockRef = useOutsideClick(() => setEditingId(null))

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingId(id)
  }

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  }

  return (
    <div
      className={cn(
        'group cursor-pointer rounded-lg p-2 transition-colors duration-300 hover:bg-selection-foreground',
        {
          'bg-selection': isEditing,
        },
        className
      )}
      onClick={handleClick}
      ref={mergeRefs<HTMLDivElement>(blockRef, setNodeRef)}
      style={style}
      {...props}
    >
      <div
        className="drag-handle flex cursor-grab justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        {...listeners}
        {...attributes}
      >
        <MdDragHandle className="h-6 w-6" />
      </div>
      {children(isEditing)}
    </div>
  )
}

export default Block
