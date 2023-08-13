import { useFormik } from 'formik'
import { useChangePassword } from 'api/auth'

import { PasswordInput } from 'components/PasswordInput'
import { Button } from 'components/Buttons'
import { newPasswordValidation } from 'lib/validators.lib'

const NewPassword = () => {
  const { isLoading, changePassword_ } = useChangePassword()

  const formik = useFormik({
    initialValues: {
      new_password: '',
      old_password: '',
    },
    validationSchema: newPasswordValidation,
    onSubmit: (values) => {
      const { new_password, old_password } = values
      changePassword_({ new_password, old_password }).then(() => formik.resetForm())
    },
  })

  return (
    <>
      <h2 className='font-semibold text-[2rem] mb-24'>Create New Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <PasswordInput
          placeholder='Password'
          label='Password'
          {...formik.getFieldProps('new_password')}
          error={formik.touched.new_password && formik.errors.new_password}
        />
        <PasswordInput
          placeholder='confirmPassword'
          label='Confirm Password'
          hideToggle={true}
          {...formik.getFieldProps('old_password')}
          error={formik.touched.old_password && formik.errors.old_password}
        />
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
  )
}

export default NewPassword
