import createAxiosInstance from '@/auth/axiosInstance'
import { Form } from '@/components/FormGallery/FormGallery'

const api = createAxiosInstance()
const BASE_URL =
  import.meta.env.VITE_ENV === 'dev'
    ? 'http://localhost:3000'
    : import.meta.env.VITE_PROD_URL

export const getForms = async (): Promise<Form[]> => {
  const response = await api.get(`${BASE_URL}/forms`)
  return response.data
}
