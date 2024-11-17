import { makeAutoObservable, runInAction, action } from 'mobx';
import { IProduct } from '@/types/products.types';
import productsService from '@/services/products.service';
import { ILocalStore } from '@/hooks/useLocalStore';

export class ProductStore implements ILocalStore {
  product: IProduct | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  currentImageIndex: number = 0;

  constructor() {
    makeAutoObservable(this, {
      setCurrentImageIndex: action,
      handlePrevImage: action,
      handleNextImage: action,
      fetchProduct: action,
    });
  }


  destroy(): void {
    this.product = null;
    this.currentImageIndex = 0;
    this.error = null;
  };

  setCurrentImageIndex = (index: number) => {
    runInAction(() => {
      this.currentImageIndex = index;
    });
  };

  handlePrevImage = () => {
    if (!this.product?.images.length) return;
    runInAction(() => {
      this.currentImageIndex = this.currentImageIndex === 0 
        ? (this.product!.images.length - 1) 
        : this.currentImageIndex - 1;
    });
  };

  handleNextImage = () => {
    if (!this.product?.images.length) return;
    runInAction(() => {
      this.currentImageIndex = this.currentImageIndex === (this.product!.images.length - 1)
        ? 0 
        : this.currentImageIndex + 1;
    });
  };

  async fetchProduct(id: number) {
    if (this.product?.id === id) return;
    
    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await productsService.getProduct(id);
      
      const parsedImages = response.data.images.map(img => {
        try {
          return JSON.parse(img);
        } catch {
          return img;
        }
      }).flat();

      runInAction(() => {
        this.product = {
          ...response.data,
          images: parsedImages
        };
      });
    } catch (error) {
      runInAction(() => {
        this.error = (error as Error).message;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}