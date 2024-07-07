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
