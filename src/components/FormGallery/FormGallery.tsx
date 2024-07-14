import { useFetchForms } from '@/hooks/useFetchForms'
import AddNewForm from './AddNewForm'
import FormCard from './FormCard'
import { useEffect } from 'react'
import useFormsStore from '@/stores/FormStore'

export type Form = {
  id: number
  title: string
  createdAt: string
  status: 'Draft' | 'Published'
  description: string
}

const FormGallery = () => {
  const { data: formsData, isLoading, isError, isSuccess } = useFetchForms()
  const { forms, setForms } = useFormsStore()
  useEffect(() => {
    if (isSuccess) {
      setForms(formsData)
      console.log(formsData);
    }
  }, [formsData, isSuccess, setForms])

  return (
    <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-3">
      <AddNewForm />
      {isLoading && <p>Loading...</p>}
      {isError && !forms?.length && <p>Something went wrong</p>}
      {forms?.length === 0 && <p>Look like your form is empty</p>}
      {forms?.map((form, index) => (
        <FormCard key={index} form={form as Form} />
      ))}
    </div>
  )
}

export default FormGallery
