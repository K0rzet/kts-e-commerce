import React from 'react';
import { Link } from 'react-router-dom';
import * as styles from './AuthToggle.module.scss';
import Text from '@/components/Text';
export function AuthToggle({ isLogin }: { isLogin: boolean }) {
  return (
    <div className="text-center text-base mt-3">
      {isLogin ? (
        <p>
          Don't have an account?
          <Link className={styles.authToggleLink} to={'/register'}>
            <Text weight={'bold'} view="p-18">
              Register
            </Text>
          </Link>
        </p>
      ) : (
        <p>
          Already have an account?{' '}
          <Link className={styles.authToggleLink} to={'/login'}>
            <Text weight={'bold'} view="p-18">
              Login
            </Text>
          </Link>
        </p>
      )}
    </div>
  );
}
