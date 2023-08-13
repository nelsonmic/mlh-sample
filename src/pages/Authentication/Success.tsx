import Logo from '../../assets/logobrand.png'
import Verified from '../../assets/icons/verified.svg'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div>
      <div className='login-page'>
        <div className='logo-image'>
          <img src={Logo} alt='logo' />
        </div>

        <div className='login-card success'>
          <h2>Success!</h2>

          <div className='image'>
            <img src={Verified} alt='verified' />
          </div>

          <p>Password Changed Successfully</p>

          {/* go to dashboard */}
          <Link to='/admin/home'>Go Home</Link>
        </div>
      </div>
    </div>
  )
}

export default Success
