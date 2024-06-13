import { ModeToggle } from '../ModeToggle'
import ProfileAvatar from '../ProfileAvatar'

const Navbar = () => {
  return (
    <nav className="sticky top-0 mx-auto flex items-center justify-between px-5 py-4">
      <h1 className="text-2xl">FormBuilder</h1>
      <div className="flex items-center space-x-2">
        <ModeToggle />
        <ProfileAvatar src="https://github.com/shadcn.png" alt="profile" />
      </div>
    </nav>
  )
}

export default Navbar
