import { getForms } from '@/api/formService'
import { useQuery } from '@tanstack/react-query'

export const useFetchForms = () => {
  return useQuery({
    queryKey: ['forms'],
    queryFn: getForms,
  })
}
