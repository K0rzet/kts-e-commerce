import { instance } from '@/api/axios';

class CartService {
  async getCart() {
    return instance.get('/cart');
  }

  async addToCart(productId: number, quantity: number) {
    return instance.post('/cart', {
      items: [{ productId, quantity }]
    });
  }

  async addBulkToCart(items: { productId: number; quantity: number; selected: boolean }[]) {
    return instance.post('/cart', { items });
  }

  async updateSelection(itemId: number, selected: boolean) {
    return instance.patch(`/cart/${itemId}/select`, { selected });
  }

  async updateQuantity(itemId: number, quantity: number) {
    return instance.patch(`/cart/${itemId}`, { quantity });
  }

  async removeFromCart(itemId: number) {
    return instance.delete(`/cart/${itemId}`);
  }

  async updateMultipleSelection(itemIds: number[], selected: boolean) {
    return instance.patch('/cart/batch-select', {
      itemIds,
      selected
    });
  }

  async removeMultipleFromCart(itemIds: number[]) {
    return instance.delete('/cart', {
      data: { itemIds }
    });
  }
}

export default new CartService(); 