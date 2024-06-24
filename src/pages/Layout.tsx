import { inputData } from '@/assets/data'
import Wrapper from '@/components/Wrapper'
import Navbar from '@/components/navigation/Navbar'
import { EditModeProvider } from '@/context/EditModeContext'
import useFormQuestionStore from '@/stores/FormQuestionStore'
import { useEffect, useRef } from 'react'
import { Outlet } from 'react-router'
import { Toaster } from '@/components/ui/sonner'

const Layout = () => {
  const { setQuestions } = useFormQuestionStore()
  const isInitalized = useRef(false)
  useEffect(() => {
    if (!isInitalized.current) {
      setQuestions(inputData)
      isInitalized.current = true
    }
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
