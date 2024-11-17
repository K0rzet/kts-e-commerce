import { observer } from 'mobx-react-lite';
import Text from '@/components/Text';
import Button from '@/components/Button';
import * as styles from './ProductDetails.module.scss';
import { ProductStore } from '@/store/ProductStore';
import React from 'react';

interface ProductDetailsProps {
  store: ProductStore;
}

export const ProductDetails = observer(({ store }: ProductDetailsProps) => {
  const { product } = store;

  if (!product) return null;

  return (
    <div className={styles.details}>
      <Text tag="h1" weight="bold" className={styles.title}>
        {product.title}
      </Text>

      <Text view="p-18" color="secondary" className={styles.description}>
        {product.description}
      </Text>

      <Text view="p-20" weight="bold" className={styles.price}>
        ${product.price}
      </Text>

      <div className={styles.actions}>
        <Button>Buy Now</Button>
        <Button className={styles.addToCartButton}>Add to Cart</Button>
      </div>
    </div>
  );
});
