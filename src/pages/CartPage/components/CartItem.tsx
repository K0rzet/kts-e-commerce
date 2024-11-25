import React from 'react';
import { observer } from 'mobx-react-lite';
import * as styles from './CartItem.module.scss';
import { useRootStore } from '@/store/RootStoreContext';
import { CartItem } from '@/types/cart.types';
import Text from '@/components/Text';
import QuantityButton from '@/components/QuantityButton';
import CheckBox from '@/components/CheckBox';
import trashSvg from '@/assets/images/trash.svg'
const CartItemComponent: React.FC<CartItem> = observer((props) => {
  const { cartStore } = useRootStore();
  const { product, quantity, selected } = props;

  const handleCheckboxChange = () => {
    cartStore.toggleSelection(product.id);
  };

  const handleRemoveClick = () => {
    cartStore.removeFromCart(product.id);
  };

  return (
    <div className={styles.cartItem}>
        <CheckBox
          checked={selected}
          onChange={handleCheckboxChange}
        />
      <div className={styles.cartContainer}>
        <div className={styles.content}>
          
        <div className={styles.imageWrapper}>
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className={styles.image}
          />
        </div>
        
        <div className={styles.body}>
          <div className={styles.header}>
            <Text
              tag="h3"
              view="p-20"
              weight="medium"
              maxLines={2}
            >
              {product.title}
            </Text>
          </div>
          
          <QuantityButton productId={product.id} />

          <div className={styles.priceWrapper}>
            <Text
              view="p-18"
              weight="bold"
              color="primary"
            >
              ${product.price} / item
            </Text>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button 
          className={styles.removeButton} 
          onClick={handleRemoveClick}
        >
          <img src={trashSvg} alt="Remove" />
        </button>
        <Text
          view="p-18"
          weight="bold"
          color="primary"
        >
          ${(product.price * quantity).toFixed(2)}
        </Text>
        </div>
      </div>
    </div>
  );
});

export default CartItemComponent;