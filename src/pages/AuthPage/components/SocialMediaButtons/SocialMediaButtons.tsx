import Button from '@/components/Button';
import { API_URL } from '@/config/api.config';
import React from 'react';
import * as styles from './SocialMediaButtons.module.scss';
import googleSvg from '@/assets/images/google.svg'
export const SocialMediaButtons = () => {
  const handleGoogleAuth = () => {
    window.location.href = API_URL + '/auth/google';
  };

  return (
    <Button onClick={handleGoogleAuth} type="button" className={styles.socialMediaButton}>
      <img src={googleSvg} width={20} height={20} alt="google auth" />
      Continue with Google
    </Button>
  );
};
