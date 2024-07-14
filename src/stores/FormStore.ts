import { createArrayManager } from '@/lib/utils'
import { create } from 'zustand'

interface FormStore {
  forms: TForm[]
  addForm: (form: TForm) => void
  updateForm: (id: number, form: Partial<TForm>) => void
  removeForm: (id: number) => void
  setForms: (forms: TForm[]) => void
}

const useFormsStore = create<FormStore>((set) => {
  const arrayManager = createArrayManager<TForm>([])
  function refresh() {
    set({ forms: arrayManager.getArray() })
  }
  return {
    forms: [],
    addForm: (form: TForm) => {
      arrayManager.push(form)
      refresh()
    },
    updateForm: (id: number, form: Partial<TForm>) => {
      const index = arrayManager.getIndexFromId(id)
      const currentForm = arrayManager.getArray()[index]
      arrayManager.update(index, { ...currentForm, ...form })
      refresh()
    },
    removeForm: (id: number) => {
      const index = arrayManager.getIndexFromId(id)
      arrayManager.remove(index)
      refresh()
    },
    setForms: (forms: TForm[]) => {
      arrayManager.setArray(forms)
      refresh()
    },
  }
})

export default useFormsStore
