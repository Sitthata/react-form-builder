import createAxiosInstance from '@/auth/axiosInstance'
import { mapToType } from '@/lib/utils'
import { upperCase } from 'lodash'

const api = createAxiosInstance()
const BASE_URL = import.meta.env.VITE_ENV === 'dev' ? '' : '/api'

export const fetchQuestions = async () => {
  const response = await api.get(`${BASE_URL}/questions`)
  return response.data
}

export const fetchQuestionById = async (id: number) => {
  const response = await api.get(`${BASE_URL}/questions/${id}`)
  const question = response.data.map((q: TInputQuestion) => {
    return {
      ...q,
      type: mapToType(q.type),
    }
  })
  return question
}

export const updateQuestion = async (id: string, question: TInputQuestion) => {
  if (!id) throw new Error('No id provided')
  const response = await api.put(`${BASE_URL}/questions/${id}`, question)
  return response.data
}

export const addQuestion = async (question: TInputQuestion, formId: number) => {
  const response = await api.post(
    `${BASE_URL}/questions/${formId}`,
    upperCase(question.type),
    {
      headers: {
        'Content-Type': 'text/plain',
      },
    }
  )

  return response.data
}
