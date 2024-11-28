import React, { useEffect } from 'react'
import AuthForm from './components/AuthForm/AuthForm'
import { useMeta } from '@/context/MetaContext';
import * as styles from './AuthPage.module.scss';
interface AuthPageProps {
  isLogin: boolean
}
const AuthPage = ({ isLogin }: AuthPageProps) => {
  const { setTitle } = useMeta();
  useEffect(() => {
    setTitle(isLogin ? 'Login' : 'Register');
  }, [isLogin, setTitle]); 
  return (
    <div className={styles.authPage}>
        <AuthForm isLogin={isLogin} />
    </div>
  )
}

export default AuthPage