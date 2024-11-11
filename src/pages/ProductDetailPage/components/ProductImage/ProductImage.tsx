import { observer } from 'mobx-react-lite';
import { productStore } from '../../../../store/ProductStore';
import styles from './ProductImage.module.scss';

export const ProductImage = observer(() => {
  console.log('ProductImage rendered');

  if (!productStore.product) return null;

  return (
    <div className={styles.imageSection}>
      <button
        className={styles.arrowButton}
        onClick={productStore.handlePrevImage}
        aria-label="Previous image"
        disabled={!productStore.product.images || productStore.product.images.length <= 1}
      />

      <img
        src={productStore.product.images[productStore.currentImageIndex]}
        alt={productStore.product.title}
        className={styles.productImage}
      />

      <button
        className={styles.arrowButton}
        onClick={productStore.handleNextImage}
        aria-label="Next image"
        disabled={!productStore.product.images || productStore.product.images.length <= 1}
      />
    </div>
  );
});
