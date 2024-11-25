import React, { useEffect } from 'react'
import AuthForm from './components/AuthForm/AuthForm'
import { useMeta } from '@/context/MetaContext';
interface AuthPageProps {
  isLogin: boolean
}
const AuthPage = ({ isLogin }: AuthPageProps) => {
  const { setTitle } = useMeta();
  useEffect(() => {
    setTitle(isLogin ? 'Login' : 'Register');
  }, [isLogin, setTitle]); 
  return (
    <div>
        <AuthForm isLogin={isLogin} />
    </div>
  )
}

export default AuthPage