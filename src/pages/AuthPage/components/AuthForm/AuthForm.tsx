import ReCAPTCHA from 'react-google-recaptcha';

import * as styles from './AuthForm.module.scss';

import React from 'react';
import { AuthToggle } from './AuthToggle';
import { useAuthForm } from './useAuthForm';
import { SocialMediaButtons } from './SocialMediaButtons';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm = ({ isLogin }: AuthFormProps) => {
  const { handleSubmit, isLoading, onSubmit, recaptchaRef, register } = useAuthForm(isLogin);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          Email
          <input
            type="email"
            placeholder="Enter email: "
            {...register('email', { required: true })}
          />
        </label>
      </div>

      <div>
        <label>
          Пароль
          <input
            type="password"
            placeholder="Enter password: "
            {...register('password', { required: true })}
          />
        </label>
      </div>
      
      <ReCAPTCHA
        ref={recaptchaRef}
        size="normal"
        sitekey={process.env.RECAPTCHA_SITE_KEY as string}
        theme="light"
      />

      <div>
        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Загрузка...' : isLogin ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </div>

      <SocialMediaButtons />

      <AuthToggle isLogin={isLogin} />
    </form>
  );
};

export default AuthForm;
