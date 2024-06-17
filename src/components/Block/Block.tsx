import { cn } from '@/lib/utils'
import React, { useEffect, useRef, useState } from 'react'

type BlockProps = {
    children: (isEditing: boolean) => React.ReactNode
    className?: string
} & React.HTMLAttributes<HTMLDivElement>

const Block = ({ children, className, ...props }: BlockProps) => {
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

    return (
        <div
            onClick={() => setIsEditing(true)}
            className={cn(
                'group cursor-pointer rounded-lg p-5 transition-colors duration-300 hover:bg-gray-800',
                {
                    'bg-gray-600': isEditing,
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
