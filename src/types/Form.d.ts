interface Block {
  id: string
  type: string
  label: string
}

type TForm = {
  id: number
  title: string
  createdAt: string
  status: 'Draft' | 'Published'
  description: string
}
interface TextInputQuestion {
  id: number
  type: 'text'
  label: string
  required: boolean
}

interface MultipleChoiceQuestion {
  id: number
  type: 'multipleChoice'
  label: string
  required: boolean
  options?: string[]
  status: boolean
  multipleType?: 'noLimit' | 'equalTo' | 'atMost'
  limit?: number
}

type TInputQuestion = TextInputQuestion | MultipleChoiceQuestion
