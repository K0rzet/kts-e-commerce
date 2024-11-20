import { makeAutoObservable } from 'mobx'
import { axiosClassic } from '@/api/axios'
import { EnumTokens } from '@/constants/auth.constants'

class AuthStore {
	private _accessToken: string | null = null

	constructor() {
		makeAutoObservable(this)
		this._accessToken = localStorage.getItem(EnumTokens.ACCESS_TOKEN)
	}

	get accessToken() {
		return this._accessToken
	}

	saveToken(token: string) {
		this._accessToken = token
		localStorage.setItem(EnumTokens.ACCESS_TOKEN, token)
	}

	removeToken() {
		this._accessToken = null
		localStorage.removeItem(EnumTokens.ACCESS_TOKEN)
	}

	async updateToken() {
		try {
			const response = await axiosClassic.post('/auth/access-token')
			if (response.data.accessToken) {
				this.saveToken(response.data.accessToken)
				return true
			}
			return false
		} catch {
			this.removeToken()
			return false
		}
	}
}

export const authStore = new AuthStore()
