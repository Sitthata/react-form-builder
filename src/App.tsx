import Navbar from '@/components/navigation/Navbar'
import './styles/index.css'
import { FormGallery } from './components/FormGallery'
import Wrapper from './components/Wrapper'

function App() {
  return (
    <Wrapper className="max-w-[1200px]">
      <Navbar />
      <h1 className="text-2xl">Your forms</h1>
      <FormGallery />
    </Wrapper>
  )
}

export default App
