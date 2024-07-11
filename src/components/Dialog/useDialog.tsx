import { useCallback, useState } from 'react'

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openDialog = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    setIsOpen,
    openDialog,
    closeDialog,
  }
}

export default useDialog
