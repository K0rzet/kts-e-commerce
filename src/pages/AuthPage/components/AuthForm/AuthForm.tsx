import ReCAPTCHA from 'react-google-recaptcha';
import Button from '@/components/Button';
import Input from '@/components/Input';
import * as styles from './AuthForm.module.scss';
import React from 'react';
import { AuthToggle } from '../AuthToggle/AuthToggle';
import { useAuthForm } from './useAuthForm';
import { SocialMediaButtons } from '../SocialMediaButtons/SocialMediaButtons';
import { Controller } from 'react-hook-form';
import Text from '@/components/Text';

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm = ({ isLogin }: AuthFormProps) => {
  const { handleSubmit, isLoading, onSubmit, recaptchaRef, control } = useAuthForm(isLogin);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.authForm}>
      <Text view="title" tag="h1" weight="bold" className={styles.title}>
        {isLogin ? 'Login' : 'Register'}
      </Text>
      <div className={styles.inputGroup}>
        <label>
          <Text view="p-18" weight="bold">
            Email
          </Text>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input type="email" placeholder="Enter email: " value={field.value} onChange={field.onChange} />
            )}
          />
        </label>

        <label>
          <Text view="p-18" weight="bold">
            Password
          </Text>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input type="password" placeholder="Enter password: " value={field.value} onChange={field.onChange} />
            )}
          />
        </label>
        <ReCAPTCHA ref={recaptchaRef} size="normal" sitekey={process.env.RECAPTCHA_SITE_KEY as string} theme="light" />
      </div>

      <Button className={styles.submitButton} type="submit" loading={isLoading} disabled={isLoading}>
        {isLogin ? 'Login' : 'Register'}
      </Button>

      <Text view="p-18" weight="bold" className={styles.socialMedia}>
        Or you can continue with Google
      </Text>
      <SocialMediaButtons />

      <AuthToggle isLogin={isLogin} />
    </form>
  );
};

export default AuthForm;
