import React, { createContext, useContext, useState } from 'react'

interface EditModeContextType {
  editingId: number | null
  setEditingId: (id: number | null) => void
}

export const EditModeContext = createContext<EditModeContextType | undefined>(
  undefined
)

export const EditModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null)
  return (
    <EditModeContext.Provider value={{ editingId, setEditingId }}>
      {children}
    </EditModeContext.Provider>
  )
}

export const useEditMode = () => {
  const context = useContext(EditModeContext)
  if (context === undefined) {
    throw new Error('useEditMode must be used within a EditModeProvider')
  }
  return context
}
