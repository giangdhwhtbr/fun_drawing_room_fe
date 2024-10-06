import * as yup from 'yup';

export const passwordValidation = yup.string()
    .required('No password provided.')
    .min(6, 'Password is too short - should be 8 chars minimum.')

export const confirmPasswordValidation = yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required')




export const SignupFormSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: passwordValidation,
})

export const ForgotPasswordFormSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
})

export const ResetPasswordFormSchema = yup.object({
    password: passwordValidation,
    confirm_password: confirmPasswordValidation,
})

export const SignInFormSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: passwordValidation,
})


export type SignUpFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined



  export type SignInFormState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
