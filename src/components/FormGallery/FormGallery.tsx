import { useFetchForms } from '@/hooks/useFetchForms'
import AddNewForm from './AddNewForm'
import FormCard from './FormCard'

export type Form = {
  id: string
  title: string
  createdAt: string
  status: 'Draft' | 'Published'
  description: string
}

const FormGallery = () => {
  const { data, isLoading, isError } = useFetchForms()
  return (
    <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-3">
      <AddNewForm />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {data?.map((form, index) => (
        <FormCard
          key={index}
          title={form.title}
          time={form.createdAt}
          status={form.status}
          description={form.description}
        />
      ))}
    </div>
  )
}

export default FormGallery
