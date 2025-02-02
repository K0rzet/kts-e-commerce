import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocalStore } from '@/hooks/useLocalStore';
import { ProductsStore } from '@/store/ProductsStore';

export const useProducts = () => {
  const productsStore = useLocalStore(() => new ProductsStore());
  const [searchParams] = useSearchParams();
  const PAGE_LIMIT = 9;
  
  const currentPage = Math.max(1, Number(searchParams.get('page')) || 1);
  const searchQuery = searchParams.get('search') || undefined;
  const categoryId = Number(searchParams.get('categories')) || undefined;

  useEffect(() => {
    const offset = PAGE_LIMIT * (currentPage - 1);
    productsStore.getProducts({limit: PAGE_LIMIT, offset, title: searchQuery, categoryId});
  }, [currentPage, searchQuery, categoryId, productsStore]);

  return {
    products: productsStore.products,
    isLoading: productsStore.meta === 'loading',
    totalCount: productsStore.totalCount,
    currentPage,
    PAGE_LIMIT
  };
}; 