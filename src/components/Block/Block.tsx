import { useEditMode } from '@/context/EditModeContext'
import { cn } from '@/lib/utils'
import { ReactNode, useEffect, useRef } from 'react'

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

  return (
    <div
      onClick={handleClick}
      className={cn(
        'group cursor-pointer rounded-lg p-5 transition-colors duration-300 hover:bg-selection-foreground',
        {
          'bg-selection': isEditing,
        },
        className
      )}
      ref={blockRef}
      {...props}
    >
      {children(isEditing)}
    </div>
  )
}

export default Block
