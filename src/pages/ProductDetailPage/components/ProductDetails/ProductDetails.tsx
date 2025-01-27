import { observer } from 'mobx-react-lite';
import Text from '@/components/Text';
import Button from '@/components/Button';
import * as styles from './ProductDetails.module.scss';
import { ProductStore } from '@/store/ProductStore';
import React, { useState } from 'react';
import { useAddToCart } from '@/hooks/useAddToCart';
import QuantityButton from '@/components/QuantityButton';
import { useRootStore } from '@/store/RootStoreContext';
import BuyNowModal from '../BuyNowModal';

interface ProductDetailsProps {
  store: ProductStore;
}

export const ProductDetails = observer(({ store }: ProductDetailsProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { product } = store;
  const { cartStore } = useRootStore();
  if (!product) return null;
  const { getAddToCartHandler } = useAddToCart([product]);

  const handleBuyNow = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setModalOpen(true);
    getAddToCartHandler(product.id)(event);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div className={styles.details}>
      <Text tag="h1" weight="bold" color="primary" className={styles.title}>
        {product.title}
      </Text>

      <Text view="p-18" color="secondary" className={styles.description}>
        {product.description}
      </Text>

      <Text weight="bold" className={styles.price}>
        ${product.price}
      </Text>

      <div className={styles.actions}>
        <Button className={styles.buyNowButton} onClick={handleBuyNow}>
          Buy Now
        </Button>

        {cartStore.items.find((item) => item.product.id === product.id) ? (
          <QuantityButton productId={product.id} />
        ) : (
          <Button className={styles.addToCartButton} onClick={getAddToCartHandler(product.id)}>
            Add to Cart
          </Button>
        )}
      </div>
      <BuyNowModal isOpen={isModalOpen} onClose={handleCloseModal} product={product} />
    </div>
  );
});
