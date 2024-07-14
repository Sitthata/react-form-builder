import createAxiosInstance from '@/auth/axiosInstance'
import { Form } from '@/components/FormGallery/FormGallery'

const api = createAxiosInstance()
const BASE_URL = import.meta.env.VITE_ENV === 'dev' ? '' : '/api'

export const getForms = async (): Promise<Form[]> => {
  const response = await api.get(`${BASE_URL}/forms`)
  return response.data
}

export const postForm = async (form: Partial<Form>) => {
  const response = await api.post(`${BASE_URL}/forms`, {
    id: Math.random().toString(36).substr(2, 9),
    ...form,
    status: 'Draft',
    time: new Date().toISOString(),
  })
  return response.data
}

export const putForm = async (id: number, form: Form) => {
  if (!id) throw new Error('Form ID is required')
  const response = await api.put(`${BASE_URL}/forms/${id}`, form)
  return response.data
}

export const deleteForm = async (id: number) => {
  const response = await api.delete(`${BASE_URL}/forms/${id}`)
  return response.data
}
