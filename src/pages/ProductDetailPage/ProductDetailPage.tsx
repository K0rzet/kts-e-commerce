import { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useLocalStore } from 'mobx-react-lite';
import styles from './ProductDetailPage.module.scss';
import Loader from '@/components/Loader';
import Text from '@/components/Text';
import { ProductImage } from './components/ProductImage';
import { ProductDetails } from './components/ProductDetails';
import { ProductStore } from '@/store/ProductStore';

const ProductDetailPage = observer(() => {
  const productStore = useLocalStore(() => new ProductStore());
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await productStore.fetchProduct(Number(id));
      }
    };

    fetchData();
  }, [id, productStore]);

  const handleNavigateBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (productStore.isLoading) {
    return <Loader size="l" className={styles.loader} />;
  }

  if (productStore.error) {
    return (
      <Text view="p-20" color="secondary">
        {productStore.error}
      </Text>
    );
  }

  if (!productStore.product) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button onClick={handleNavigateBack} className={styles.backButton}>
        ← Назад
      </button>

      <div className={styles.content}>
        <ProductImage store={productStore} />
        <ProductDetails store={productStore} />
      </div>
    </div>
  );
});

export default ProductDetailPage;
