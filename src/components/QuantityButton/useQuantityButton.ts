import { useCallback } from 'react';
import { useRootStore } from '@/store/RootStoreContext';

export const useQuantityButton = (productId: number) => {
  const { cartStore } = useRootStore();
  
  const cartItem = cartStore.items.find(item => item.product.id === productId);

  const handleIncrease = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (cartItem) {
      cartStore.updateQuantity(productId, cartItem.quantity + 1);
    }
  }, [cartItem, cartStore, productId]);

  const handleDecrease = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (cartItem && cartItem.quantity > 1) {
      cartStore.updateQuantity(productId, cartItem.quantity - 1);
    } else if (cartItem) {
      cartStore.removeFromCart(productId);
    }
  }, [cartItem, cartStore, productId]);

  return {
    quantity: cartItem?.quantity || 0,
    handleIncrease,
    handleDecrease
  };
}; 