import { getFormById } from '@/api/formService'
import { useQuery } from '@tanstack/react-query'

export const useFetchQuestion = (id: number) => {
  return useQuery<TFormQuestion>({
    queryKey: ['questions'],
    queryFn: () => getFormById(id),
  })
}
