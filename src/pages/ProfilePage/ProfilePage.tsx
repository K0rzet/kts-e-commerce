import React from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/store/RootStoreContext';
import Button from '@/components/Button/Button';
import UserAvatar from '@/components/UserAvatar/UserAvatar';
import * as styles from './ProfilePage.module.scss';
import { useNavigate } from 'react-router-dom';

const ProfilePage = observer(() => {
  const { userStore } = useRootStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    userStore.logout();
    navigate('/auth');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <UserAvatar />
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>{userStore.user?.name}</h1>
          <p className={styles.email}>{userStore.user?.email}</p>
        </div>

        <Button onClick={handleLogout} className={styles.logoutButton}>
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
});

export default ProfilePage;
