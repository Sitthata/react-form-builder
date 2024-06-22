interface Block {
  id: string
  type: string
  label: string
}

interface TextInputQuestion {
  id: number;
  type: 'text';
  label: string;
  required: boolean;
}

interface MultipleChoiceQuestion {
  id: number
  type: 'text' | 'multipleChoice' | 'rating' | 'date'
  label: string
  required: boolean
  multipleChoose?: TMultipleChoose
  selected?: number
  options?: string[]
}

type TMultipleChoose = {
  status: boolean
  type?: 'noLimit' | 'equalTo' | 'atMost'
  limit?: number
}

type TInputQuestion = TextInputQuestion | MultipleChoiceQuestion
