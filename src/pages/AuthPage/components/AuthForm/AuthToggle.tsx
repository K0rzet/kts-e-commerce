import Button from '@/components/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export function AuthToggle({ isLogin }: { isLogin: boolean }) {
	const navigate = useNavigate();
	const handleRegister = () => navigate('/register');
	const handleLogin = () => navigate('/login');

	return (
		<div className="text-center text-base mt-3">
			{isLogin ? (
				<p>
					Нет аккаунта?{' '}
					<Button
						type="button"
						onClick={handleRegister}
					>
						Зарегистрироваться
					</Button>
				</p>
			) : (
				<p>
					Уже есть аккаунт?{' '}
					<Button
						type="button"
						onClick={handleLogin}
					>
						Войти
					</Button>
				</p>
			)}
		</div>
	)
}
