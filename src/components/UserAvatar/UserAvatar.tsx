import { observer } from 'mobx-react-lite';
import React from 'react'
import { useRootStore } from '@/store/RootStoreContext' 
import defaultAvatar from '@/assets/images/default-avatar.jpeg';
import * as styles from './UserAvatar.module.scss';
const UserAvatar = observer(() => {
  const { userStore } = useRootStore();
  
  React.useEffect(() => {
    if (!userStore.user) {
      userStore.fetchUser();
    }
  }, [userStore]);

  return (
    <div className={styles.userAvatar}>
      
        <img 
          src={userStore.user?.avatarPath ? userStore.user.avatarPath : defaultAvatar}
          alt="User avatar"
          className={styles.userAvatarImage}
        />
      
    </div>
  )
});

export default UserAvatar
