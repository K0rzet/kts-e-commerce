import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/Button';
import Text from '../../components/Text';
import { IProduct } from '../../types/products.types';
import productsService from '../../services/products.service';
import styles from './ProductDetailPage.module.scss';
import Loader from '../../components/Loader';

interface ProductDetailPageState {
  data: IProduct | null;
  isLoading: boolean;
  error: string | null;
  currentImageIndex: number;
}

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState<ProductDetailPageState>({
    data: null,
    isLoading: false,
    error: null,
    currentImageIndex: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const response = await productsService.getProduct(Number(id));
        
        const parsedImages = response.data.images.map(img => {
          try {
            return JSON.parse(img);
          } catch {
            return img;
          }
        }).flat();

        setState((prev) => ({ 
          ...prev, 
          data: {
            ...response.data,
            images: parsedImages
          },
          error: null 
        }));
      } catch (error) {
        setState((prev) => ({ ...prev, error: (error as Error).message }));
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchProduct();
  }, [id]);

  const handlePrevImage = () => {
    if (!state.data?.images.length) return;
    setState((prev) => ({
      ...prev,
      currentImageIndex: prev.currentImageIndex === 0 ? state.data !== null ? state.data.images.length - 1 : prev.currentImageIndex - 1 : 0,
    }));
  };

  const handleNextImage = () => {
    if (!state.data?.images.length) return;
    setState((prev) => ({
      ...prev,
      currentImageIndex: prev.currentImageIndex === (state.data?.images.length || 0) - 1 ? 0 : prev.currentImageIndex + 1,
    }));
  };

  if (state.isLoading) {
    return <Loader size="l" className={styles.loader} />;
  }

  if (state.error) {
    return (
      <Text view="p-20" color="secondary">
        {state.error}
      </Text>
    );
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Назад
      </button>

      <div className={styles.content}>
        <div className={styles.imageSection}>
          <button 
            className={styles.arrowButton} 
            onClick={handlePrevImage}
            aria-label="Previous image"
            disabled={!state.data?.images || state.data.images.length <= 1}
          />
          
          {state.data?.images && (
            <img 
              src={state.data.images[state.currentImageIndex]} 
              alt={state.data.title}
              className={styles.productImage}
            />
          )}
          
          <button 
            className={styles.arrowButton} 
            onClick={handleNextImage}
            aria-label="Next image"
            disabled={!state.data?.images || state.data.images.length <= 1}
          />
        </div>

        <div className={styles.details}>
          <Text tag="h1" weight="bold" className={styles.title}>
            {state.data?.title}
          </Text>

          <Text view="p-18" color="secondary" className={styles.description}>
            {state.data?.description}
          </Text>

          <Text view="p-20" weight="bold" className={styles.price}>
            ${state.data?.price}
          </Text>

          <div className={styles.actions}>
            <Button>Buy Now</Button>
            <Button className={styles.addToCartButton}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
