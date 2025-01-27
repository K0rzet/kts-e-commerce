import { makeAutoObservable, runInAction } from 'mobx';
import { CreateOrderDTO } from '@/types/order.types';
import orderService from '@/services/order.service';
import { ILocalStore } from '@/hooks/useLocalStore';
import { useRootStore } from '@/store/RootStoreContext';

export class OrderStore implements ILocalStore {
  isLoading = false;
  error: string | null = null;
  confirmation_url: string | null = null;
  private rootStore = useRootStore();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  

  async createOrder(orderData: CreateOrderDTO) {
    try {
      this.setLoading(true);
      this.setError(null);

      const { userStore } = this.rootStore;
      const { cartStore } = this.rootStore;
      
      const orderDataWithEmail = {
        ...orderData,
        email: userStore.user?.email
      };
      
      const response = await orderService.createOrder(orderDataWithEmail);

      if (!response.confirmation.confirmation_url) {
        throw new Error('Invalid response from server');
      }

      runInAction(() => {
        this.confirmation_url = response.confirmation.confirmation_url;
      });
      cartStore.loadCart()
      window.location.href = response.confirmation.confirmation_url;

    } catch (error: unknown) {
      console.error('Error creating order:', error);
      if (error instanceof Error) {
        this.setError(error.message);
      } else {
        this.setError('Failed to create order');
      }
      throw error;
    } finally {
      this.setLoading(false);
    }
  }


  

  private setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  private setError(error: string | null) {
    this.error = error;
  }

  reset() {
    this.isLoading = false;
    this.error = null;
  }

  destroy() {
    this.reset();
  }
} 