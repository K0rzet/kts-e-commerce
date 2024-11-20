import React from 'react';
import { observer } from 'mobx-react-lite';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import Text from '@/components/Text';
import * as styles from './CartPage.module.scss';
import { useRootStore } from '@/store/RootStoreContext';

const CartPage: React.FC = observer(() => {
  const { cartStore } = useRootStore();

  if (cartStore.items.length === 0) {
    return (
      <div className={styles.empty}>
        <Text tag="h2" view="title" weight="bold">
          Your cart is empty
        </Text>
      </div>
    );
  }

  return (
    <div className={styles.cartWrapper}>
      <Text tag="h2" view="title" weight="bold">
        Shopping Cart ({cartStore.totalItems} items)
      </Text>
      <div className={styles.products}>
        {cartStore.items.map((item) => (
          <ProductCard
            key={item.id}
            {...item}
            actionSlot={
              <div className={styles.actions}>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => cartStore.updateQuantity(item.id, parseInt(e.target.value))}
                />
                <Button onClick={() => cartStore.removeFromCart(item.id)}>
                  Remove
                </Button>
              </div>
            }
          />
        ))}
      </div>
      <div className={styles.total}>
        <Text tag="h3" view="title" weight="bold">
          Total: ${cartStore.totalPrice.toFixed(2)}
        </Text>
      </div>
    </div>
  );
});

export default CartPage; 