import Wrapper from '@/components/Wrapper'
import Navbar from '@/components/navigation/Navbar'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Wrapper className="max-w-[1200px]">
        <Outlet />
      </Wrapper>
    </div>
  )
}

export default Layout
