import { makeAutoObservable, runInAction } from 'mobx';
import { IProduct } from '@/types/products.types';

interface CartItem extends IProduct {
  quantity: number;
}

export class CartStore {
  items: CartItem[] = [];
  
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadFromLocalStorage();
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

  addToCart(product: IProduct) {
    console.log('Adding to cart:', product);
    runInAction(() => {
      const existingItem = this.items.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      this.saveToLocalStorage();
    });
  }

  removeFromCart(productId: number) {
    runInAction(() => {
      this.items = this.items.filter(item => item.id !== productId);
      this.saveToLocalStorage();
    });
  }

  updateQuantity(productId: number, quantity: number) {
    runInAction(() => {
      const item = this.items.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
        this.saveToLocalStorage();
      }
    });
  }

  get totalItems() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get totalPrice() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
} 