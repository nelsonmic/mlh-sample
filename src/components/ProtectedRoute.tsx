import { useAppSelector } from 'hooks/reduxHooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const navigate = useNavigate()
  // const isAuthenticated = true
  useEffect(() => {
    if (!isAuthenticated) navigate('/auth')
  }, [])

  return <>{isAuthenticated && children}</>
}

export default ProtectedRoute
