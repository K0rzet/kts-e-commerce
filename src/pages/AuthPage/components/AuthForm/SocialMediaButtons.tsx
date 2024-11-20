import { API_URL } from '@/config/api.config'
import React from 'react'

export const SocialMediaButtons = () => {
	return (
		<div className="grid grid-cols-2 gap-4">
			<button
				onClick={() => (window.location.href = API_URL + '/auth/google')}
				className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
				type="button"
			>
				<img
					src="/google.svg"
					width={20}
					height={20}
					alt="google auth"
					className="w-5 h-5 mr-2"
				/>
			</button>
		</div>
	)
}
