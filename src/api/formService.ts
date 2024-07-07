import createAxiosInstance from '@/auth/axiosInstance'
import { Form } from '@/components/FormGallery/FormGallery'

const api = createAxiosInstance()

export const getForms = async (): Promise<Form[]> => {
  const response = await api.get(`/forms`)
  return response.data
}

export const postForm = async (form: Partial<Form>) => {
  const response = await api.post(`/forms`, {
    id: Math.random().toString(36).substr(2, 9),
    ...form,
    status: 'Draft',
    time: new Date().toISOString(),
  })
  return response.data
}
