import { observer } from 'mobx-react-lite';
import { ProductStore } from '@/store/ProductStore';
import styles from './ProductImage.module.scss';

interface ProductImageProps {
  store: ProductStore;
}

export const ProductImage = observer(({ store }: ProductImageProps) => {
  const { product, currentImageIndex, handlePrevImage, handleNextImage } = store;

  if (!product) return null;

  return (
    <div className={styles.imageSection}>
      <button
        className={styles.arrowButton}
        onClick={handlePrevImage}
        aria-label="Previous image"
        disabled={!product.images || product.images.length <= 1}
      />

      <img
        src={product.images[currentImageIndex]}
        alt={product.title}
        className={styles.productImage}
      />

      <button
        className={styles.arrowButton}
        onClick={handleNextImage}
        aria-label="Next image"
        disabled={!product.images || product.images.length <= 1}
      />
    </div>
  );
});
