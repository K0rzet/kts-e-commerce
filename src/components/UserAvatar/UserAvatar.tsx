import { observer } from 'mobx-react-lite';
import React from 'react'
import { useRootStore } from '@/store/RootStoreContext' 
import UserIcon from '../Layout/Header/components/UserIcon';

const UserAvatar = observer(() => {
  const { userStore } = useRootStore();
  
  React.useEffect(() => {
    if (!userStore.user) {
      userStore.fetchUser();
    }
  }, [userStore]);

  return (
    <div className="w-8 h-8 rounded-full overflow-hidden">
      {userStore.user?.avatarPath ? (
        <img 
          src={userStore.user.avatarPath}
          alt="User avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <UserIcon />
      )}
    </div>
  )
});

export default UserAvatar
