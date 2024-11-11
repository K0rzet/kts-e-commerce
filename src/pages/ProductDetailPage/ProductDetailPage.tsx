import { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './ProductDetailPage.module.scss';
import Loader from '../../components/Loader';
import Text from '../../components/Text';
import { productStore } from '../../store/ProductStore';
import { ProductImage } from './components/ProductImage';
import { ProductDetails } from './components/ProductDetails';

const ProductDetailPage = observer(() => {
  console.log('ProductDetailPage rendered');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        productStore.resetState();
        await productStore.fetchProduct(Number(id));
      }
    };

    fetchData();
    return () => {
      productStore.resetState();
    };
  }, [id]);

  const handleNavigateBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  if (productStore.isLoading) {
    console.log('Loader rendered');
    return <Loader size="l" className={styles.loader} />;
  }

  if (productStore.error) {
    console.log('Error rendered');
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
        <ProductImage />
        <ProductDetails />
      </div>
    </div>
  );
});

export default ProductDetailPage;
