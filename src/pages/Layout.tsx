import { inputData } from '@/assets/data'
import Wrapper from '@/components/Wrapper'
import Navbar from '@/components/navigation/Navbar'
import { EditModeProvider } from '@/context/EditModeContext'
import useFormQuestionStore from '@/stores/FormQuestionStore'
import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { Toaster } from '@/components/ui/sonner'

const Layout = () => {
  const { setQuestions } = useFormQuestionStore()
  useEffect(() => {
    setQuestions(inputData)
  }, [setQuestions])
  return (
    <div>
      <Navbar />
      <EditModeProvider>
        <Wrapper className="max-w-[1200px]">
          <Outlet />
        </Wrapper>
      </EditModeProvider>
      <Toaster />
    </div>
  )
}

export default Layout
