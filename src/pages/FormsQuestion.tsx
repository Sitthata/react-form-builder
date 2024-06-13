import { DynamicForm } from "@/components/FormComponents"


const FormsQuestion = () => {
  return (
    <div>
      <DynamicForm
        label="What is your name?"
        name="text"
        placeholder="Enter your name"
      />
    </div>
  )
}

export default FormsQuestion
