import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { IFormData } from '@/types/users.types'
import { AuthFormStore } from '@/store/AuthFormStore'
import { useLocalStore } from '@/hooks/useLocalStore'

export const useAuthForm = (isLogin: boolean) => {
  const navigate = useNavigate()
  const { register, handleSubmit, reset, control } = useForm<IFormData>()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  
  const authFormStore = useLocalStore(() => new AuthFormStore())

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    const token = recaptchaRef?.current?.getValue()

    if (!token) {
      throw new Error('Пройдите капчу!')
    }

    try {
      const success = await authFormStore.handleAuth(
        isLogin ? 'login' : 'register',
        data,
        token
      )

      if (success) {
        reset()
        navigate('/')
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
    }
  }

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    recaptchaRef,
    isLoading: authFormStore.isLoading
  }
}
