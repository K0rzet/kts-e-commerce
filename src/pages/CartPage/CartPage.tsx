import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Text from '@/components/Text';
import * as styles from './CartPage.module.scss';
import { useRootStore } from '@/store/RootStoreContext';
import CartItemComponent from './components/CartItem';
import Button from '@/components/Button';
import CheckBox from '@/components/CheckBox';
import { useNavigate } from 'react-router-dom';
import { useMeta } from '@/context/MetaContext';

const CartPage: React.FC = observer(() => {
  const { cartStore } = useRootStore();
  const navigate = useNavigate();
  const handleNavigateToCatalog = () => {
    navigate('/products');
  };

  const { setTitle } = useMeta();
  useEffect(() => {
    setTitle('Cart');
  }, [setTitle]);
  if (cartStore.items.length === 0) {
    return (
      <div className={styles.empty}>
        <Text tag="h2" view="title" weight="bold">
          Your cart is empty
        </Text>
        <Button onClick={handleNavigateToCatalog} className={styles.cartButton}>Go to catalog</Button>
      </div>
    );
  }

  const handleSelectAll = (checked: boolean) => {
    cartStore.toggleAllSelection(checked);
  };

  const handleRemoveSelected = () => {
    cartStore.removeSelectedItems();
  };

  const handleOrderPlacement = () => {
    navigate('/order');
  };

  return (
    <div className={styles.cartWrapper}>
      <Text tag="h2" view="title" weight="bold">
        Shopping Cart
      </Text>
      <div className={styles.cartHeader}>
        <div className={styles.selectAll}>
          <CheckBox checked={cartStore.areAllItemsSelected} onChange={handleSelectAll} />
          <Text view="p-16" color="secondary">
            Select All
          </Text>
        </div>
        {cartStore.selectedItems.length > 0 && <Button onClick={handleRemoveSelected} className={styles.cartButton}>Delete Selected</Button>}
      </div>
      <div className={styles.cartContent}>
        <div className={styles.products}>
          {cartStore.items.map((item) => (
            <CartItemComponent
              key={item.id}
              product={item.product}
              id={item.id}
              quantity={item.quantity}
              selected={item.selected}
              userId={item.userId}
            />
          ))}
        </div>
        <div className={styles.total}>
          <Text tag="h3" view="title" weight="bold">
            Total
          </Text>
          <div className={styles.totalPrice}>
            <Text tag="p" view="p-18" weight="bold">
              {cartStore.totalSelectedItems} items
            </Text>
            <Text tag="p" view="p-18" weight="bold">
              ${cartStore.totalSelectedPrice.toFixed(2)}
            </Text>
          </div>
          
          <Button 
            onClick={handleOrderPlacement}
            disabled={cartStore.selectedItems.length === 0}
            className={styles.cartButton}
          >
            Order placement
          </Button>
        </div>
      </div>
    </div>
  );
});

export default CartPage;
