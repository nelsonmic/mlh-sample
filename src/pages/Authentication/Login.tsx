import { useLoginUser } from 'api/auth'
import { useAppSelector } from 'hooks/reduxHooks'
import React from 'react'
import { Link } from 'react-router-dom'
import { FormInput } from '../../components/FormInput'
import { Button } from '../../components/Buttons'
import { PasswordInput } from '../../components/PasswordInput'
import { Routes } from 'core/routing'
import { useFormik } from 'formik'
import { loginValidation } from 'lib/validators.lib'

const Login: React.FunctionComponent = () => {
  const { isLoading, login_ } = useLoginUser()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      const { email, password } = values
      login_({ email, password }).then(() => formik.resetForm())
    },
  })

  return (
    <>
      {!isAuthenticated && (
        <>
          <h2 className='font-semibold text-[2rem] mb-24'>Admin Dashboard Login</h2>
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              type='text'
              label='Email Address'
              placeholder='balogunjohn@gmail.com'
              {...formik.getFieldProps('email')}
              error={formik.touched.email && formik.errors.email}
            />
            <PasswordInput
              placeholder='Password'
              label='Password'
              {...formik.getFieldProps('password')}
              error={formik.touched.password && formik.errors.password}
            />

            <div className='py-2 mb-8 flex justify-end'>
              <Link
                to={Routes.ForgotPassword}
                className='text-[1.2rem] text-blue-100 font-semibold'
              >
                <p>I forgot my password!</p>
              </Link>
            </div>

            <Button
              type='submit'
              variant={'filled'}
              size='lg'
              className='w-full py-6 mt-6'
              loading={isLoading}
            >
              <p>Login</p>
            </Button>
          </form>
        </>
      )}
    </>
  )
}

export default Login
