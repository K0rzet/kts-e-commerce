import { observer } from 'mobx-react-lite';
import { productStore } from '../../../../store/ProductStore';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';
import styles from './ProductDetails.module.scss';

export const ProductDetails = observer(() => {
  console.log('ProductDetails rendered');

  if (!productStore.product) return null;

  return (
    <div className={styles.details}>
      <Text tag="h1" weight="bold" className={styles.title}>
        {productStore.product.title}
      </Text>

      <Text view="p-18" color="secondary" className={styles.description}>
        {productStore.product.description}
      </Text>

      <Text view="p-20" weight="bold" className={styles.price}>
        ${productStore.product.price}
      </Text>

      <div className={styles.actions}>
        <Button>Buy Now</Button>
        <Button className={styles.addToCartButton}>Add to Cart</Button>
      </div>
    </div>
  );
});
