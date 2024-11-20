import { makeAutoObservable } from 'mobx'
import { AxiosError } from 'axios'
import { IFormData } from '@/types/users.types'
import authService from '@/services/auth/auth.service'
import { errorCatch } from '@/api/api.helper'
import { ILocalStore } from '@/hooks/useLocalStore'

export class AuthFormStore implements ILocalStore {
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  setIsLoading(value: boolean) {
    this.isLoading = value
  }

  async handleAuth(type: 'login' | 'register', data: IFormData, captchaToken: string | null) {
    this.setIsLoading(true)
    try {
      await authService.main(type, data, captchaToken)
      return true
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(errorCatch(error))
      }
      return false
    } finally {
      this.setIsLoading(false)
    }
  }

  destroy() {
    this.isLoading = false
  }
}
