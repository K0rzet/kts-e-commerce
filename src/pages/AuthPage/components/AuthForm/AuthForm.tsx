import ReCAPTCHA from 'react-google-recaptcha';
import Button from '@/components/Button';
import Input from '@/components/Input';
import * as styles from './AuthForm.module.scss';
import React from 'react';
import { AuthToggle } from '../AuthToggle/AuthToggle';
import { useAuthForm } from './useAuthForm';
import { SocialMediaButtons } from '../SocialMediaButtons/SocialMediaButtons';
import { Controller } from 'react-hook-form';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm = ({ isLogin }: AuthFormProps) => {
  const { handleSubmit, isLoading, onSubmit, recaptchaRef, control } = useAuthForm(isLogin);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          Email
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                type="email"
                placeholder="Enter email: "
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </label>
      </div>

      <div>
        <label>
          Password
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                type="password"
                placeholder="Enter password: "
                value={field.value}
                onChange={field.onChange}
              />
            )}
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
        <Button
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          className={styles.authButton}
        >
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </div>

      <SocialMediaButtons />

      <AuthToggle isLogin={isLogin} />
    </form>
  );
};

export default AuthForm;
