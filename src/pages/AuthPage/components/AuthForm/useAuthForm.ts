import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { IFormData } from '@/types/users.types'
import { AuthFormStore } from '@/store/AuthFormStore'
import { useLocalStore } from '@/hooks/useLocalStore'
import { authStore } from '@/store/AuthStore'
import { useRootStore } from '@/store/RootStoreContext'

export const useAuthForm = (isLogin: boolean) => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { cartStore } = useRootStore()
  
  const { register, handleSubmit, reset, control } = useForm<IFormData>()
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const authFormStore = useLocalStore(() => new AuthFormStore())

  const syncCart = async () => {
    try {
      const hasLocalCart = localStorage.getItem('cart')
      if (!hasLocalCart) return

      await cartStore.syncLocalCartWithServer()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      
      const retrySync = window.confirm(
        'Failed to sync your cart. Would you like to try again?'
      )
      if (retrySync) {
        await syncCart()
      }
    }
  }

  const onSubmit: SubmitHandler<IFormData> = async (data) => {
    try {
      setIsSubmitting(true)
      
      const token = recaptchaRef?.current?.getValue()
      if (!token) {
        console.error('Please complete the captcha')
        return
      }

      const success = await authFormStore.handleAuth(
        isLogin ? 'login' : 'register',
        data,
        token
      )

      if (success) {
        if (authStore.accessToken) {
          await syncCart()
        }
        
        reset()
        navigate('/')
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      } else {
        console.error('An unexpected error occurred')
      }
      console.error('Auth error:', error)
    } finally {
      setIsSubmitting(false)
      recaptchaRef.current?.reset()
    }
  }

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    recaptchaRef,
    isLoading: isSubmitting || authFormStore.isLoading
  }
}
