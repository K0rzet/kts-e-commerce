import { authStore } from '@/store/AuthStore'
import React from 'react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SocialAuthPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    if (accessToken) authStore.saveToken(accessToken)

    navigate('/', { replace: true })
  }, [navigate, searchParams])

  return <div>Loading...</div>
}

export default SocialAuthPage
