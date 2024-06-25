import axios from 'axios'

export const fetchQuestions = async () => {
  const response = await axios.get('http://localhost:3000/questions')
  return response.data
}

export const fetchQuestionById = async (id: string) => {
  const response = await axios.get(`http://localhost:3000/questions/${id}`)
  return response.data
}
