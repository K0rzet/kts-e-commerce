import { makeAutoObservable, runInAction } from 'mobx';
import { IProduct } from '@/types/products.types';
import cartService from '@/services/cart/cart.service';
import { authStore } from './AuthStore';
import { CartItem } from '@/types/cart.types';

export class CartStore {
  items: CartItem[] = [];
  isLoading = false;
  
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadCart();
  }

  async loadCart() {
    if (authStore.accessToken) {
      await this.fetchServerCart();
    } else {
      this.loadFromLocalStorage();
    }
  }

  private async fetchServerCart() {
    try {
      const { data } = await cartService.getCart();
      runInAction(() => {
        this.items = data.items;
      });
    } catch (error) {
      console.error('Error loading server cart:', error);
    }
  }

  private loadFromLocalStorage() {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        runInAction(() => {
          this.items = JSON.parse(savedCart);
        });
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }

  async addToCart(product: IProduct) {
    if (authStore.accessToken) {
      try {
        await cartService.addToCart(product.id, 1);
        await this.fetchServerCart();
      } catch (error) {
        console.error('Error adding to server cart:', error);
      }
    } else {
      runInAction(() => {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          this.items.push({
            id: product.id,
            product,
            quantity: 1,
            selected: true
          });
        }
        this.saveToLocalStorage();
      });
    }
  }

  async syncLocalCartWithServer() {
    if (!this.items.length || !authStore.accessToken) return;

    this.isLoading = true;
    
    try {
      const localItems = [...this.items];
      
      localStorage.removeItem('cart');
      runInAction(() => {
        this.items = [];
      });

      const { data: serverCart } = await cartService.getCart();
      
      const itemsToSync = localItems.map(localItem => {
        const serverItem = serverCart.items.find((item: CartItem) => item.id === localItem.id);
        return {
          productId: localItem.id,
          quantity: serverItem 
            ? serverItem.quantity + localItem.quantity 
            : localItem.quantity,
          selected: localItem.selected
        };
      });

      await cartService.addBulkToCart(itemsToSync);
      
      await this.fetchServerCart();
      
    } catch (error) {
      console.error('Error syncing local cart with server:', error);
      throw new Error('Failed to sync cart with server');
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async toggleSelection(productId: number) {
    if (authStore.accessToken) {
      const item = this.items.find(item => item.product.id === productId);
      if (item) {
        await cartService.updateSelection(item.id, !item.selected);
        await this.fetchServerCart();
      }
    } else {
      runInAction(() => {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
          item.selected = !item.selected;
          this.saveToLocalStorage();
        }
      });
    }
  }

  get selectedItems() {
    return this.items.filter(item => item.selected);
  }

  get totalSelectedItems() {
    return this.selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalSelectedPrice() {
    return this.selectedItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  async updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) return;

    if (authStore.accessToken) {
      try {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
          await cartService.updateQuantity(item.id, quantity);
          await this.fetchServerCart();
        }
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    } else {
      runInAction(() => {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
          item.quantity = quantity;
          this.saveToLocalStorage();
        }
      });
    }
  }

  async removeFromCart(productId: number) {
    if (authStore.accessToken) {
      try {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
          await cartService.removeFromCart(item.id);
          await this.fetchServerCart();
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    } else {
      runInAction(() => {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.saveToLocalStorage();
      });
    }
  }

  reset() {
    runInAction(() => {
      this.items = [];
      this.loadFromLocalStorage();
    });
  }

  get areAllItemsSelected() {
    return this.items.length > 0 && this.items.every(item => item.selected);
  }

  async toggleAllSelection(selected: boolean) {
    if (authStore.accessToken) {
      try {
        const itemIds = this.items.map(item => item.id);
        await cartService.updateMultipleSelection(itemIds, selected);
        await this.fetchServerCart();
      } catch (error) {
        console.error('Error updating multiple selection:', error);
      }
    } else {
      runInAction(() => {
        this.items.forEach(item => {
          item.selected = selected;
        });
        this.saveToLocalStorage();
      });
    }
  }

  async removeSelectedItems() {
    const selectedIds = this.selectedItems.map(item => item.id);
    
    if (selectedIds.length === 0) return;

    if (authStore.accessToken) {
      try {
        await cartService.removeMultipleFromCart(selectedIds);
        await this.fetchServerCart();
      } catch (error) {
        console.error('Error removing selected items:', error);
      }
    } else {
      runInAction(() => {
        this.items = this.items.filter(item => !item.selected);
        this.saveToLocalStorage();
      });
    }
  }
} 