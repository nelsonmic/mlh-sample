import React from 'react'
import Logo from '../../assets/logobrandWhite.png'
import styles from './Sidebar.module.scss'
import { NavLink } from 'react-router-dom'
import navlinks from './links'
import Logout from '../../assets/icons/logout.png'
import Orders from '../../assets/icons/orders.png'
import Home from '../../assets/icons/home.png'
import cn from 'classnames'
import { RxCaretDown } from 'react-icons/rx'
import { useValidHaulageRoute } from 'hooks/useValidHaulageRoute'
import { Routes } from 'core/routing'

const Sidebar = () => {
  const [showSubMenu, setShowSubMenu] = React.useState<boolean>(false)
  const isValidRoute = useValidHaulageRoute()

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <img src={Logo} alt='' />
      </div>

      <div className={styles.links}>
        <NavLink
          to={Routes.AdminRoot}
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#3A3A3AE8' : 'transparent',
            borderRadius: isActive ? '0 20px 20px 0' : '0px',
          })}
          // activeClassName={styles.active}
          className={styles.link}
        >
          <img className={styles.icon} src={Home} alt='' />
          <div className={styles.text}>Home</div>
        </NavLink>
        <div>
          <span className='relative'>
            <NavLink
              to={Routes.Orders}
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#3A3A3AE8' : 'transparent',
                borderRadius: isActive ? '0 20px 20px 0' : '0px',
              })}
              className={cn(
                'flex items-center py-[8px] pl-[4rem] hover:curosr-pointer transition ease-in-out my-2',
              )}
              onClick={() => setShowSubMenu(false)}
            >
              <img className='w-[1.5rem] mr-[20px]' src={Orders} alt='' />
              <div className='text-[1.2rem]'>Orders</div>
            </NavLink>
            <button
              className='z-10 absolute top-[50%] translate-y-[-50%] right-[0] mr-8 outline-none transition ease-in-out duration-500 focus:bg-[#ffffff] border-none w-[25px] h-[20px] rounded-2xl'
              onClick={() => {
                setShowSubMenu(!showSubMenu)
              }}
            >
              <RxCaretDown
                className={cn(
                  'w-[20px] h-[20px] font-bold m-auto transition ease-in-out duration-500',
                  showSubMenu && 'rotate-180',
                )}
              />
            </button>
          </span>
          {(showSubMenu || isValidRoute) && (
            <div className={cn('mt-2 p-4 pt-0 rounded-[4px] overflow-hidden')}>
              <NavLink
                to={Routes.Haulage}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? '#3A3A3AE8' : 'transparent',
                })}
                className={cn(
                  'flex items-center py-[8px] pl-[4rem] hover:curosr-pointer transition ease-in-out',
                )}
              >
                <p className='text-[1.2rem] text-center'>Haulage</p>
              </NavLink>
            </div>
          )}
        </div>

        {navlinks.map((link, index) => {
          return (
            <NavLink
              key={index}
              to={`${link.path}`}
              style={({ isActive }) => ({
                backgroundColor: isActive ? '#3A3A3AE8' : 'transparent',
                borderRadius: isActive ? '0 20px 20px 0' : '0px',
              })}
              className={styles.link}
            >
              <img className={styles.icon} src={link.icon} alt='' />
              <div className={styles.text}>{link.name}</div>
            </NavLink>
          )
        })}
      </div>

      <div className={styles.bottomLink}>
        <img className={styles.icon} src={Logout} alt='' />
        <p>Logout</p>
      </div>
    </div>
  )
}

export default Sidebar
