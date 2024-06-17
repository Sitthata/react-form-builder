import { Block } from '@/components/Block'
import { DynamicForm } from '@/components/FormComponents'

const FormBuilderPage = () => {
  return (
    <div>
      <DynamicForm />
      <Block>
        {(isEditing) => (
          <div>{isEditing ? <h1>Edit</h1> : <h1>Default</h1>}</div>
        )}
      </Block>
    </div>
  )
}

export default FormBuilderPage
