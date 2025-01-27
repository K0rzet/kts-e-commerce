import { makeAutoObservable, runInAction } from 'mobx';
import { IProduct } from '@/types/products.types';

const VIEWED_PRODUCTS_KEY = 'viewedProducts';
const MAX_VIEWED_PRODUCTS = 20;

export class ViewedProductsStore {
  private _products: IProduct[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.loadFromLocalStorage();
  }

  get products() {
    return this._products;
  }

  private loadFromLocalStorage() {
    try {
      const saved = localStorage.getItem(VIEWED_PRODUCTS_KEY);
      if (saved) {
        runInAction(() => {
          this._products = JSON.parse(saved);
        });
      }
    } catch (error) {
      console.error('Error loading viewed products:', error);
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem(VIEWED_PRODUCTS_KEY, JSON.stringify(this._products));
    } catch (error) {
      console.error('Error saving viewed products:', error);
    }
  }

  addProduct(product: IProduct) {
    runInAction(() => {
      this._products = this._products.filter(p => p.id !== product.id);
      
      this._products.unshift(product);
      
      if (this._products.length > MAX_VIEWED_PRODUCTS) {
        this._products = this._products.slice(0, MAX_VIEWED_PRODUCTS);
      }
      
      this.saveToLocalStorage();
    });
  }

  clear() {
    runInAction(() => {
      this._products = [];
      localStorage.removeItem(VIEWED_PRODUCTS_KEY);
    });
  }
} 