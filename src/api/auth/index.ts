import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import {
  changePassword,
  forgotPassword,
  getProfile,
  loginUser,
  registerUser,
  savePassword,
  verifyLink,
} from './service.api'
import { useAppDispatch } from 'hooks/reduxHooks'
import { login } from 'reducers/authSlice'
import { useNavigate } from 'react-router-dom'
import { handleApiError } from 'lib/observables/notifications'

export const useGetProfile = () => useQuery({ queryKey: ['profile'], queryFn: getProfile })

export const useVerifyLink = (token: string) =>
  useQuery({
    queryKey: ['verify', token],
    queryFn: () => verifyLink({ token }),
    retry: 1,
    enabled: !!token,
    refetchOnWindowFocus: false,
  })

export const useLoginUser = (opt = {}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const methods = useMutation({
    mutationFn: (data: LoginRequestType) => loginUser(data),
    ...opt,
  })

  const login_ = async ({ email, password }: { email: string; password: string }) => {
    return methods.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          setTimeout(() => {
            dispatch(
              login({
                token: res.data.accessToken,
                user: {
                  firstName: res.data.first_name,
                  lastName: res.data.last_name,
                  role: res.data.role,
                  email: res.data.email,
                },
              }),
            )
            navigate('/')
          }, 2000)
        },
        onError(error: any) {
          handleApiError(error)
        },
      },
    )
  }
  return {
    ...methods,
    login_,
  }
}

export const useForgotPassword = (opt = {}) => {
  const methods = useMutation({
    mutationFn: (data: ForgotPasswordRequestType) => forgotPassword(data),
    ...opt,
  })

  const forgotPassword_ = async ({ email }: { email: string }) => {
    return methods.mutate(
      { email },
      {
        onSuccess(data) {
          console.log(data)
        },
        onError(error: any) {
          handleApiError(error)
        },
      },
    )
  }

  return {
    ...methods,
    forgotPassword_,
  }
}

export const useRegisterUser = (opt = {}) => {
  return useMutation<unknown, AxiosError, RegisterUserRequestType>({
    mutationFn: (data) => registerUser(data),
    ...opt,
  })
}

export const useChangePassword = (opt = {}) => {
  const methods = useMutation({
    mutationFn: (data: changePasswordType) => changePassword(data),
    ...opt,
  })

  const changePassword_ = async ({
    new_password,
    old_password,
    email = 'wewew',
  }: {
    new_password: string
    old_password: string
    email?: string
  }) => {
    return methods.mutate(
      { new_password, old_password, email },
      {
        onSuccess() {
          //   setRequestState('success')
        },
        onError(error) {
          handleApiError(error)
        },
      },
    )
  }

  return {
    ...methods,
    changePassword_,
  }
}

export const useSavePassword = () => {
  return useMutation({
    mutationFn: (data: SavePasswordRequestType) => savePassword(data),
  })
}
