import AddNewForm from './AddNewForm'
import FormCard from './FormCard'

const FormGallery = () => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-3">
      <AddNewForm />
      {Array.from({ length: 3 }).map((_, index) => (
        <FormCard key={index} />
      ))}
    </div>
  )
}

export default FormGallery
