import { makeAutoObservable, runInAction, action, observable } from 'mobx';
import { IOrder } from '@/types/order.types';
import { ILocalStore } from '@/hooks/useLocalStore';
import orderService from '@/services/order.service';

export class ProfileStore implements ILocalStore {
  orders: IOrder[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this, {
      fetchOrders: action,
      orders: observable
    });
  }

  destroy(): void {
    this.orders = [];
    this.error = null;
  }

  async fetchOrders() {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await orderService.getPaidOrders();
      runInAction(() => {
        this.orders = response.data
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
