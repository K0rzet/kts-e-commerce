import React, { useEffect, useState } from 'react';
import { IProduct } from '../../types/products.types';
import productsService from '../../services/products.service';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import Text from '../../components/Text';
import styles from './ProductPage.module.scss';
import Loader from '../../components/Loader';
import ProductsPagination from './components/ProductsPagination';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface ProductsState {
  data: IProduct[];
  isLoading: boolean;
  error: string | null;
  totalCount: number;
}

const INITIAL_STATE: ProductsState = {
  data: [],
  isLoading: false,
  error: null,
  totalCount: 0,
};

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const PAGE_LIMIT = 9;

  const [state, setState] = useState<ProductsState>(INITIAL_STATE);
  const navigate = useNavigate();

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));
        const [productsResponse, totalResponse] = await Promise.all([
          productsService.getProducts(PAGE_LIMIT, PAGE_LIMIT * (currentPage - 1)),
          productsService.getProducts(),
        ]);

        setState((prev) => ({ 
          ...prev, 
          data: productsResponse.data,
          totalCount: totalResponse.data.length,
          error: null 
        }));
      } catch (error) {
        setState((prev) => ({ ...prev, error: (error as Error).message }));
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleAddToCart = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    console.log(`add to cart ${id}`);
  };

  return (
    <div className={styles.productsWrapper}>
      <Text tag="h2" view="title" weight="bold">
        Total Product
        {state.totalCount ? (
          <span className={styles.productsCount}>{state.totalCount}</span>
        ) : state.error ? (
          <Text tag="span" view="p-18">
            {state.error}
          </Text>
        ) : (
          <Loader size="m" />
        )}
      </Text>
      <div className={styles.products}>
        {state.data.map((product) => (
          <ProductCard
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            {...product}
            actionSlot={
              <Button
                onClick={(event) => handleAddToCart(product.id, event)}
              >
                Add to Cart
              </Button>
            }
          />
        ))}
      </div>
      <ProductsPagination
        currentPage={currentPage}
        totalPages={Math.ceil(state.totalCount / PAGE_LIMIT)}
        onPageChange={handlePageChange}
        className={styles.pagination}
      />
    </div>
  );
};

export default ProductsPage;
