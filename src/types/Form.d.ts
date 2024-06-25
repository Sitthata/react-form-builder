interface Block {
  id: string
  type: string
  label: string
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
  multipleChoose: TMultipleChoose
  options?: string[]
}

type TMultipleChoose = {
  status: boolean
  type?: 'noLimit' | 'equalTo' | 'atMost'
  limit?: number
}

type TInputQuestion = TextInputQuestion | MultipleChoiceQuestion
