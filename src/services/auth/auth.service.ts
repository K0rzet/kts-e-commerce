import { axiosClassic } from '@/api/axios'
import { authStore } from '@/store/AuthStore'
import { IFormData, IUser } from '@/types/users.types'

interface IAuthResponse {
	accessToken: string
	user: IUser
}

class AuthService {
	async main(
		type: 'login' | 'register',
		data: IFormData,
		token?: string | null
	) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data,
			{
				headers: {
					recaptcha: token
				}
			}
		)

		if (response.data.accessToken) authStore.saveToken(response.data.accessToken)

		return response
	}

	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/access-token'
		)

		if (response.data.accessToken) authStore.saveToken(response.data.accessToken)

		return response
	}

	async getNewTokensByRefresh(refreshToken: string) {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/access-token',
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`
				}
			}
		)

		return response.data
	}

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		if (response.data) authStore.removeToken()

		return response
	}
}

export default new AuthService()
