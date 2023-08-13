import * as yup from 'yup'
import { isValidPhoneNumber } from './utils.lib'

export const emailSchema = yup.string().email('Enter a valid email address')
export const phoneSchema = yup.string().test('phone number', isValidPhoneNumber)

export const loginValidation = yup.object().shape({
  email: emailSchema.required('This field is required'),
  password: yup.string().required('Password is required'),
})

export const forgotPasswordValidation = yup.object().shape({
  email: emailSchema.required('This field is required'),
})

export const newPasswordValidation = yup.object().shape({
  new_password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  old_password: yup
    .string()
    .oneOf([yup.ref('new_password'), undefined], 'Passwords must match')
    .required('Confirm password is required'),
})

export const editHaulageValidation = yup.object().shape({
  status: yup
    .string()
    .required('This field is required')
    .oneOf(
      [
        'Approved',
        'In transit',
        'Paid',
        'Completed',
        'approved',
        'In transit',
        'paid',
        'completed',
      ],
      'Hint: Approved | In transit | Paid | Completed',
    ),
  categories: yup.string().required('This field is required'),
  description: yup.string().required('This field is required'),
  delivery_time: yup.string().required('This field is required'),
  total_charge: yup.string().required('This field is required'),
})
