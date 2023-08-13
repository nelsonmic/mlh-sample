import React from 'react'
import './app.scss'
import './tailwind.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Authentication/Login'
import Orders from './pages/Orders'
import Tracking from './pages/Tracking'
import Reports from './pages/Reports'
import Transactions from './pages/Transactions'
import Newsletter from './pages/Newsletter'
import Waitlist from './pages/Waitlist'
import Settings from './pages/Settings/Settings'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home/Home'
import ForgotPassword from 'pages/Authentication/ForgotPassword'
import EnterOTP from 'pages/Authentication/EnterOTP'
import NewPassword from 'pages/Authentication/NewPassword'
import Success from 'pages/Authentication/Success'
import VerifyToken from 'pages/Authentication/Verify'
import HaulageEntry from 'pages/Haulage'
import Haulage from 'pages/Haulage/Haulage'
import Edit from 'pages/Haulage/Edit'
import Auth from 'pages/Authentication'
import ErrorPage from 'pages/404'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='auth' element={<Auth />}>
            <Route index element={<Login />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='enter-otp' element={<EnterOTP />} />
            <Route path='set-password' element={<NewPassword />} />
            <Route path='success' element={<Success />} />
            <Route path='verify/:token' element={<VerifyToken />} />
          </Route>

          <Route path='/' element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path='orders' element={<Orders />}></Route>
            <Route path='haulage' element={<HaulageEntry />}>
              <Route index element={<Haulage />} />
              <Route path='edit' element={<Edit />} />
            </Route>
            <Route path='tracking' element={<Tracking />}></Route>
            <Route path='reports' element={<Reports />}></Route>
            <Route path='transactions' element={<Transactions />}></Route>
            <Route path='newsletter' element={<Newsletter />}></Route>
            <Route path='waitlist' element={<Waitlist />}></Route>
            <Route path='settings' element={<Settings />}></Route>
          </Route>
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
