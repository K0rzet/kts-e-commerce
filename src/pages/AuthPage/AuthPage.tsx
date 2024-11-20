import React from 'react'
import AuthForm from './components/AuthForm/AuthForm'
interface AuthPageProps {
  isLogin: boolean
}
const AuthPage = ({ isLogin }: AuthPageProps) => {
  return (
    <div>
        <AuthForm isLogin={isLogin} />
    </div>
  )
}

export default AuthPage