import createAxiosInstance from '@/auth/axiosInstance'

const api = createAxiosInstance()
const BASE_URL = import.meta.env.VITE_ENV === 'dev' ? '' : '/api'

export const fetchQuestions = async () => {
  const response = await api.get(`${BASE_URL}/questions`)
  return response.data
}

export const fetchQuestionById = async (id: string) => {
  const response = await api.get(`${BASE_URL}/questions/${id}`)
  return response.data
}

export const updateQuestion = async (id: string, question: TInputQuestion) => {
  if (!id) throw new Error('No id provided')
  const response = await api.put(`${BASE_URL}/questions/${id}`, question)
  return response.data
}

export const addQuestion = async (question: TInputQuestion) => {
  const response = await api.post(`${BASE_URL}/questions`, question)
  return response.data
}
