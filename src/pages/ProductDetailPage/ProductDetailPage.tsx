import { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useLocalStore } from 'mobx-react-lite';
import * as styles from './ProductDetailPage.module.scss';
import Loader from '@/components/Loader';
import Text from '@/components/Text';
import { ProductImage } from './components/ProductImage';
import { ProductDetails } from './components/ProductDetails';
import { ProductStore } from '@/store/ProductStore';
import React from 'react';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';

const ProductDetailPage = observer(() => {
  const productStore = useLocalStore(() => new ProductStore());
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, relatedProducts } = productStore;

  const categoryId = product?.category.id;

  useEffect(() => {
    if (categoryId) {
      productStore.fetchRelatedItems(categoryId);
    }
  }, [categoryId, productStore]);

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

      {relatedProducts.length > 0 && (
        <div className={styles.relatedProducts}>
          <Text view="title" weight="bold" tag="h2" className={styles.relatedTitle}>
            Related Items
          </Text>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                images={relatedProduct.images}
                title={relatedProduct.title}
                description={relatedProduct.description}
                category={relatedProduct.category}
                price={relatedProduct.price}
                onClick={() => navigate(`/product/${relatedProduct.id}`)}
                actionSlot={<Button>Add to Cart</Button>}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

export default ProductDetailPage;
