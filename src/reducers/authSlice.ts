import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { deleteCookie, getCookie, setCookie } from 'lib/cookie.lib'

// interface ContextUserState {
//   firstName: string
//   lastName: string
//   role: UserRole
//   email: string
// }

interface AuthState {
  token: string | null | undefined
  isAuthenticated: boolean | null
  user: any | null
}

const initialState: AuthState = {
  // token: localStorage.getItem('token'),
  token: typeof window !== 'undefined' ? getCookie('token') : null,
  isAuthenticated: checkAuthenticated(),
  // check for use in local storage or set to null
  user:
    typeof window !== 'undefined'
      ? getCookie('d_user')
        ? JSON.parse(getCookie('d_user') || '{}')
        : null
      : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState['user']>) => {
      setCookie('token', action.payload.token)
      setCookie('d_user', JSON.stringify(action.payload.user))
      state.token = action.payload.token
      state.isAuthenticated = true
      state.user = action.payload.user
    },
    logout: (state) => {
      deleteCookie('token')
      deleteCookie('d_user')
      state.token = null
      state.isAuthenticated = false
      state.user = null
    },
    // update only user profile info
    updateUser: (state, action: PayloadAction<AuthState['user']>) => {
      localStorage.setItem('d_user', JSON.stringify(action.payload))
      state.user = action.payload
    },
  },
})

export const { login, logout, updateUser } = authSlice.actions

export const selectToken = (state: { auth: AuthState }) => state.auth.token
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectUser = (state: { auth: AuthState }) => state.auth.user

export default authSlice.reducer

// utility functions
function checkAuthenticated() {
  if (typeof window !== 'undefined') {
    return getCookie('token') ? true : false
  }

  return null
}
