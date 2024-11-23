import React, { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/store/RootStoreContext';
import Button from '@/components/Button/Button';
import * as styles from './ProfilePage.module.scss';
import { useNavigate } from 'react-router-dom';
import Text from '@/components/Text';
import defaultAvatar from '@/assets/images/default-avatar.jpeg';
import ProductCard from '@/components/ProductCard';
import { useHorizontalScroll } from '@/hooks/useHorizontalScroll';

const ProfilePage = observer(() => {
  const { userStore, viewedProductsStore } = useRootStore();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useHorizontalScroll(scrollContainerRef);

  const handleLogout = () => {
    userStore.logout();
    navigate('/auth');
  };

  return (
    <div className={styles.profileWrapper}>
      <Text tag="h1" view="title" weight="bold">
        Profile
      </Text>

      <div className={styles.profileContent}>
        <div className={styles.profileInfo}>
          <div className={styles.avatar}>
            <img src={(userStore.user?.avatarPath && userStore.user?.avatarPath) || defaultAvatar} alt="User avatar" />
          </div>

          <div className={styles.info}>
            {userStore.user?.name && <h1 className={styles.name}>Name: {userStore.user?.name}</h1>}
            {userStore.user?.email && <p className={styles.email}>Email: {userStore.user?.email}</p>}
          </div>

          <Button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </Button>
        </div>
        <div className={styles.profileSections}>
          <h2>Past orders</h2>
          <h2>You watched</h2>
          <div className={styles.viewedProductsContainer}>
            <div className={styles.viewedProducts} ref={scrollContainerRef}>
              {viewedProductsStore.products.map((product) => (
                <ProductCard key={product.id} {...product} productId={product.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProfilePage;
