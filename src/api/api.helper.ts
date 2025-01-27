import { AxiosError } from 'axios'

export const getContentType = () => ({
	'Content-Type': 'application/json',
})

export interface IErrorResponse {
	message: string | string[]
}

export const errorCatch = (error: AxiosError<IErrorResponse>): string => {
	const message = error.response?.data?.message

	return message
		? typeof message === 'object'
			? message[0]
			: message
		: error.message
}
