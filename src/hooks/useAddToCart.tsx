import { useCallback, useState } from 'react';
import { useRootStore } from '@/store/RootStoreContext';
import { IProduct } from '@/types/products.types';

export const useAddToCart = (products: IProduct[]) => {
  const { cartStore } = useRootStore();
  const [addedProducts, setAddedProducts] = useState<Record<number, boolean>>({});

  const handleAddToCart = useCallback(
    (id: number, event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const product = products?.find((p) => p.id === id);
      if (product) {
        cartStore.addToCart(product);
        setAddedProducts((prev) => ({ ...prev, [id]: true }));
        setTimeout(() => {
          setAddedProducts((prev) => ({ ...prev, [id]: false }));
        }, 1000);
      }
    },
    [products, cartStore]
  );

  const getAddToCartHandler = useCallback(
    (productId: number) => {
      return (event: React.MouseEvent) => handleAddToCart(productId, event);
    },
    [handleAddToCart]
  );

  return { addedProducts, getAddToCartHandler };
};
