import { cn } from '@/lib/utils'
import React from 'react'

type WrapperProps = {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

const Wrapper = ({ children, className }: WrapperProps) => {
  return <div className={cn('container', className)}>{children}</div>
}

export default Wrapper
