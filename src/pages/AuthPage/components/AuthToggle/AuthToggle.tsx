import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './AuthToggle.module.scss';
import Text from '@/components/Text';
export function AuthToggle({ isLogin }: { isLogin: boolean }) {
  return (
    <div className={styles.authToggle}>
      {isLogin ? (
        <div className={styles.authToggleText}>
          <Text view="p-18" color="primary">
            Don't have an account?
          </Text>
          <Link className={styles.authToggleLink} to={'/register'}>
            <Text weight={'bold'} view="p-18">
              Register
            </Text>
          </Link>
        </div>
      ) : (
        <div className={styles.authToggleText}>
          <Text view="p-18" color="primary">
            Already have an account?{' '}
          </Text>
          <Link className={styles.authToggleLink} to={'/login'}>
            <Text weight={'bold'} view="p-18">
              Login
            </Text>
          </Link>
        </div>
      )}
    </div>
  );
}
