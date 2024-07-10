import createAxiosInstance from '@/auth/axiosInstance'

const api = createAxiosInstance()

export const fetchQuestions = async () => {
  const response = await api.get(`/questions`)
  return response.data
}

export const fetchQuestionById = async (id: string) => {
  const response = await api.get(`/questions/${id}`)
  return response.data
}

export const updateQuestion = async (id: string, question: TInputQuestion) => {
  if (!id) throw new Error('No id provided')
  const response = await api.put(`/questions/${id}`, question)
  return response.data
}
