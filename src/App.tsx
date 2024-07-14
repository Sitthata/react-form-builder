import './styles/index.css'
import Wrapper from '@/components/Wrapper'
import Navbar from '@/components/navigation/Navbar'
import { EditModeProvider } from '@/context/EditModeContext'
import useFormQuestionStore from '@/stores/FormQuestionStore'
import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { Toaster } from '@/components/ui/sonner'
import { useQuery } from '@tanstack/react-query'
import { fetchQuestions } from './api/questionsService'

function App() {
  // const { setQuestions } = useFormQuestionStore()
  // const { data, isSuccess } = useQuery({
  //   queryKey: ['questions'],
  //   queryFn: fetchQuestions,
  // })
  // useEffect(() => {
  //   if (isSuccess) {
  //     setQuestions(data)
  //   }
  // }, [data, setQuestions, isSuccess])
  return (
    <>
      <Navbar />
      <EditModeProvider>
        <Wrapper className="max-w-[1200px]">
          <Outlet />
        </Wrapper>
      </EditModeProvider>
      <Toaster />
    </>
  )
}

export default App
