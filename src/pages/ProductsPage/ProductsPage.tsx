import React, { useCallback, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import Text from '@/components/Text';
import * as styles from './ProductsPage.module.scss';
import Loader from '@/components/Loader';
import ProductsPagination from './components/ProductsPagination';
import { useProducts } from './hooks/useProducts';
import Dropdown from '@/components/Dropdown';
import { Option } from '@/components/Dropdown';
import { Meta } from '@/constants/meta';
import { CategoryStore } from '@/store/CategoryStore';
import { useLocalStore } from '@/hooks/useLocalStore';
import SearchInput from './components/SearchInput';
import Titles from './components/Titles';
import { useMeta } from '@/context/MetaContext';
import { useAddToCart } from '@/hooks/useAddToCart';


const ProductsPage: React.FC = observer(() => {
  const categoryStore = useLocalStore(() => new CategoryStore());
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, totalCount, currentPage, PAGE_LIMIT } = useProducts();
  const { categories } = categoryStore;
  const { setTitle } = useMeta();
  const { addedProducts, getAddToCartHandler } = useAddToCart(products);
  useEffect(() => {
    setTitle('Products');
  }, [setTitle]);
  useEffect(() => {
    if (categories.length === 0 && categoryStore.meta !== Meta.loading) {
      categoryStore.getCategories();
    }
  }, [categories.length, categoryStore]);

  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      key: category.id.toString(),
      value: category.name,
    }));
  }, [categories]);

  const selectedCategory = categoryOptions.find((option) => option.key === searchParams.get('categories')) || null;

  const handleCategoryChange = useCallback(
    (selected: Option | null) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        if (selected) {
          newParams.set('categories', selected.key);
        } else {
          newParams.delete('categories');
        }
        newParams.set('page', '1');
        return newParams;
      });
    },
    [setSearchParams],
  );

  const getTitle = useCallback((selected: Option | null) => {
    if (!selected) return 'Select category';
    return selected.value;
  }, []);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.set('page', newPage.toString());
        return newParams;
      });
    },
    [setSearchParams],
  );

  return (
    <div className={styles.productsWrapper}>
      <div className={styles.header}>
        <Titles />
        <div className={styles.filters}>
          <SearchInput />
          <Dropdown
            options={categoryOptions}
            value={selectedCategory}
            onChange={handleCategoryChange}
            getTitle={getTitle}
            disabled={categoryStore.meta === Meta.loading}
          />
        </div>
      </div>
      <Text tag="h2" view="title" weight="bold">
        Total Products
        {totalCount ? (
          <span className={styles.productsCount}>{totalCount}</span>
        ) : isLoading ? (
          <Loader size="m" />
        ) : null}
      </Text>
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard
            productId={product.id}
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            {...product}
            actionSlot={<Button onClick={getAddToCartHandler(product.id)} className={styles.addToCartButton}>{addedProducts[product.id] ? 'Added to Cart' : 'Add to Cart'}</Button>}
          />
        ))}
      </div>
      <ProductsPagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalCount / PAGE_LIMIT)}
        onPageChange={handlePageChange}
        className={styles.pagination}
      />
    </div>
  );
});

export default ProductsPage;
