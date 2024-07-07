import createAxiosInstance from '@/auth/axiosInstance'

const api = createAxiosInstance()
const BASE_URL =
  import.meta.env.VITE_ENV === 'dev'
    ? 'http://localhost:3000'
    : import.meta.env.VITE_PROD_URL

export const fetchQuestions = async () => {
  const response = await api.get(`${BASE_URL}/questions`)
  return response.data
}

export const fetchQuestionById = async (id: string) => {
  const response = await api.get(`${BASE_URL}/questions/${id}`)
  return response.data
}
