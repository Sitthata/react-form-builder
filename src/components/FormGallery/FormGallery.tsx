import { useFetchForms } from '@/hooks/useFetchForms'
import AddNewForm from './AddNewForm'
import FormCard from './FormCard'
import { useEffect } from 'react'
import useFormsStore from '@/stores/FormStore'
import ErrorDisplay from './ErrorDisplay'

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
      console.log(formsData)
    }
  }, [formsData, isSuccess, setForms])

  return (
    <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-3">
      <AddNewForm />
      <ErrorDisplay
        isLoading={isLoading}
        isError={isError}
        isEmpty={forms?.length === 0}
      />
      {forms?.length === 0 && !isLoading && <p>Look like your form is empty</p>}
      {forms?.map((form, index) => (
        <FormCard key={index} form={form as Form} />
      ))}
    </div>
  )
}

export default FormGallery
