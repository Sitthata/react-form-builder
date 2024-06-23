import TextInputBlock from './TextInputBlock'
import MultipleChoiceBlock from './MultipleChoiceBlock'
import useFormQuestionStore from '@/stores/FormQuestionStore';

type QuestionRendererProps = {
  question: TInputQuestion
  index: number
};

const QuestionRenderer = ({ question, index }: QuestionRendererProps) => {
  const { updateQuestion } = useFormQuestionStore()
  switch (question.type) {
    case "text":
      return (
        <TextInputBlock
          key={question.id}
          question={question as TextInputQuestion}
          updateQuestion={updateQuestion}
          runningNumber={index + 1}
        />
      )
    case "multipleChoice":
      return (
        <MultipleChoiceBlock
          key={question.id}
          question={question as MultipleChoiceQuestion}
          updateQuestion={updateQuestion}
          runningNumber={index + 1}
        />
      )
    default:
      return null
  }
}

export default QuestionRenderer

