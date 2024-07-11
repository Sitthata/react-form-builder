import { deleteForm, getForms, postForm, putForm } from '@/api/formService'
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

export const usePutForm = (id: number, form: TForm) => {
  return useMutation({
    mutationKey: ['putForm'],
    mutationFn: async () => putForm(id, form),
  })
}

export const useDeleteForm = (id: number) => {
  return useMutation({
    mutationKey: ['deleteForm'],
    mutationFn: async () => deleteForm(id),
  })
}
