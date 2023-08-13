import { AiOutlineLoading } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import VerifyIllustration from '../../assets/icons/verified.svg'
import SadIllustration from '../../assets/icons/sad.svg'
import Logo from '../../assets/logobrand.png'
import { useVerifyLink } from 'api/auth'

type ParamsType = {
  token: string
}

const VerifyToken = () => {
  const params = useParams<ParamsType>()
  const result = useVerifyLink(params.token ?? '')

  let styles: any

  return (
    <div>
      <div className='login-page'>
        <div className='logo-image'>
          <img src={Logo} alt='logo' />
        </div>

        <div className={`login-card ${styles.container}`}>
          {result.isLoading && (
            <div className={`${styles.spacing_section}`}>
              <h2>Verifying....</h2>
              <p className={`${styles.loading_icon}`}>
                <AiOutlineLoading />
              </p>
            </div>
          )}

          {result.isSuccess && (
            <div className={`${styles.spacing_section}`}>
              <h2>Verification Successful</h2>
              <img src={VerifyIllustration} alt='Verify illustration' />
              <p>Please click the button below to set your password</p>
              {params.token && (
                <Link className='' to={`/set-password/${params.token}`}>
                  Set Password
                </Link>
              )}
            </div>
          )}

          {result.isError && (
            <div className={`${styles.spacing_section}`}>
              <h2>Verification Failed</h2>
              <img src={SadIllustration} alt='Sad illustration' />
              <p>
                You are not been able to been able to be verified at this moment. Please contact the
                admin
              </p>
            </div>
          )}

          <div className='login-card__form'></div>
        </div>
      </div>
    </div>
  )
}

export default VerifyToken
