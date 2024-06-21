interface Block {
  id: string
  type: string
  label: string
}

interface ChoiceBlock extends Block {
  choices: Choice[]
}

interface Choice {
  id: string
  label: string
  value: string
}

type TInputQuestion = {
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
