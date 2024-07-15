import { useAuth } from '@/auth/AuthContext'
import { ModeToggle } from '../ModeToggle'
import ProfileAvatar from '../ProfileAvatar'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { isAuth } = useAuth()
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    setIsLogin(isAuth)
  }, [isAuth])

  return (
    <nav
      className={cn(
        'sticky top-0 z-50 mx-auto flex items-center justify-between px-5 py-4'
      )}
    >
      <h1 className="text-2xl">
        <Link to="/">FormBuilder</Link>
      </h1>
      <div
        className={cn({
          hidden: isLogin,
          block: !isLogin,
        })}
      >
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="login">Login</Link>
          </Button>
          <Button>
            <Link to="signup">Get Started</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>

      <div
        className={cn(
          { hidden: !isLogin, flex: isLogin },
          'items-center space-x-2'
        )}
      >
        <ModeToggle />
        <ProfileAvatar src="https://github.com/shadcn.png" alt="profile" />
      </div>
    </nav>
  )
}

export default Navbar
