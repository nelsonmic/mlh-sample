import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar/Sidebar'
import Topbar from '../components/Topbar'
import ProtectedRoute from 'components/ProtectedRoute'

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <main className='flex'>
        <Sidebar />

        <div className='flex-1 ml-[250px]'>
          <Topbar />
          <div className='p-[2rem] mt-[3rem]'>
            <Outlet />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}

export default Dashboard
