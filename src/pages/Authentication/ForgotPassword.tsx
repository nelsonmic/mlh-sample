import { FormInput } from 'components/FormInput'
import { Button } from 'components/Buttons'
import { AuthHeader } from '.'
import { Routes } from 'core/routing'
import { useFormik } from 'formik'
import { forgotPasswordValidation } from 'lib/validators.lib'
import { useForgotPassword } from 'api/auth'

const ForgotPassword = () => {
  const { isLoading, forgotPassword_ } = useForgotPassword()
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: forgotPasswordValidation,
    onSubmit: (values) => {
      const { email } = values
      forgotPassword_({ email }).then(() => formik.resetForm())
    },
  })

  return (
    <>
      <AuthHeader to={Routes.Login} label='Forgot Password' />
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          type='text'
          label='Email Address'
          placeholder='balogunjohn@gmail.com'
          {...formik.getFieldProps('email')}
          error={formik.touched.email && formik.errors.email}
        />
        <Button
          type='submit'
          variant={'filled'}
          size='lg'
          className='w-full py-6 mt-6 mb-24'
          loading={isLoading}
        >
          <p>Login</p>
        </Button>
      </form>
    </>
  )
}

export default ForgotPassword
