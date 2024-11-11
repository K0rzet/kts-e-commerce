import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import Text from '../../components/Text';
import styles from './ProductPage.module.scss';
import Loader from '../../components/Loader';
import ProductsPagination from './components/ProductsPagination';
import { useProducts } from './hooks/useProducts';
import SearchInput from '../../components/SearchInput';
import MultiDropdown from '../../components/MultiDropdown';
import { Option } from '../../components/MultiDropdown/MultiDropdown';
import { rootStore } from '../../store/RootStore';

const ProductsPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, totalCount, currentPage, PAGE_LIMIT } = useProducts();
  const { categories } = rootStore;

  useEffect(() => {
    categories.getCategories();
  }, [categories]);

  const categoryOptions: Option[] = categories.categories.map(category => ({
    key: category.id.toString(),
    value: category.name
  }));

  const selectedCategoryIds = searchParams.get('categories')?.split(',').map(Number) || [];
  const selectedOptions = categoryOptions.filter(option => 
    selectedCategoryIds.includes(Number(option.key))
  );

  const handleCategoryChange = (selected: Option[]) => {
    const categoryIds = selected.map(option => option.key);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (categoryIds.length > 0) {
        newParams.set('categories', categoryIds.join(','));
      } else {
        newParams.delete('categories');
      }
      newParams.set('page', '1');
      return newParams;
    });
  };

  const getTitle = (selected: Option[]) => {
    if (selected.length === 0) return 'Select categories';
    return selected.map(option => option.value).join(', ');
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('page', newPage.toString());
      return newParams;
    });
  };

  const handleAddToCart = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.productsWrapper}>
      <div className={styles.header}>
        <Text tag="h2" view="title" weight="bold">
          Total Products
          {totalCount ? (
            <span className={styles.productsCount}>{totalCount}</span>
          ) : isLoading ? (
            <Loader size="m" />
          ) : null}
        </Text>
        <div className={styles.filters}>
          <MultiDropdown
            options={categoryOptions}
            value={selectedOptions}
            onChange={handleCategoryChange}
            getTitle={getTitle}
            disabled={categories.meta === 'loading'}
          />
          <SearchInput />
        </div>
      </div>
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            {...product}
            actionSlot={
              <Button onClick={(event) => handleAddToCart(product.id, event)}>
                Add to Cart
              </Button>
            }
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
