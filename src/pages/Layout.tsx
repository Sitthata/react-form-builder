import Wrapper from '@/components/Wrapper'
import Navbar from '@/components/navigation/Navbar'
import { EditModeProvider } from '@/context/EditModeContext'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <EditModeProvider>
        <Wrapper className="max-w-[1200px]">
          <Outlet />
        </Wrapper>
      </EditModeProvider>
    </div>
  )
}

export default Layout
