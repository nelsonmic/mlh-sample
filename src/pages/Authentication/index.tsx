import { Outlet, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logobrand.png'
import { useAppSelector } from 'hooks/reduxHooks'
import { Routes } from 'core/routing'
import React from 'react'
import cn from 'classnames'
// import Arrow from '../../assets/icons/direction.svg'

const Auth = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isAuthenticated) navigate(Routes.AdminRoot)
  }, [])
  return (
    <div className='flex flex-col gap-[10px] items-center justify-center min-h-[100vh]'>
      <div className='w-[150px] h-[150px]'>
        <img src={Logo} alt='logo' className='object-contain w-full h-full' />
      </div>
      <div className='w-[90%] max-w-[550px] min-h-[350px] p-12 lg:p-24 rounded-lg shadow-2xl'>
        <Outlet />
      </div>
    </div>
  )
}

export const AuthHeader = ({ to, label }: { to: string; label: string }) => {
  return (
    <h2 className={cn('font-semibold text-[2rem] mb-12', to)}>{label}</h2>
    // <Link to={to} className='block mb-12 items-center flex no-wrap gap-2 '>
    //   <img src={Arrow} alt='direction' className='w-[20px]' />
    // </Link>
  )
}

export default Auth
