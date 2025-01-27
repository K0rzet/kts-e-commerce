import { instance } from '@/api/axios'
import { IUser } from '@/types/users.types'

class UserService {
	private _BASE_URL = '/users'

	async fetchProfile() {
        const response = await instance.get<IUser>(`${this._BASE_URL}/profile`)
		return response.data
	}
}

export default new UserService()
