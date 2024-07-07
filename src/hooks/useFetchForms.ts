import { getForms, postForm } from '@/api/formService'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useFetchForms = () => {
  return useQuery({
    queryKey: ['forms'],
    queryFn: getForms,
  })
}

export const usePostForm = () => {
  return useMutation({
    mutationKey: ['postForm'],
    mutationFn: postForm,
  })
}
