import { makeAutoObservable, runInAction } from 'mobx';
import { CreateOrderDTO } from '@/types/order.types';
import orderService from '@/services/order.service';
import { ILocalStore } from '@/hooks/useLocalStore';
import { authStore } from '@/store/AuthStore';
import { useRootStore } from '@/store/RootStoreContext';

type YooKassaWidget = {
  render: (elementId: string) => void;
  destroy: () => void;
};

export class OrderStore implements ILocalStore {
  isLoading = false;
  error: string | null = null;
  confirmationToken: string | null = null;
  orderId: string | null = null;
  private yooKassaWidget: YooKassaWidget | null = null;
  private rootStore = useRootStore();
  private isYooKassaLoaded = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async createOrder(orderData: CreateOrderDTO) {
    try {
      this.setLoading(true);
      this.setError(null);

      const isAuthenticated = !!authStore.accessToken;
      const { userStore } = this.rootStore;
      
      const orderDataWithEmail = {
        ...orderData,
        email: isAuthenticated ? userStore.user?.email : orderData.email
      };
      
      const response = await orderService.createOrder(orderDataWithEmail, isAuthenticated);

      if (!response.orderId || !response.confirmationToken) {
        throw new Error('Invalid response from server');
      }

      runInAction(() => {
        this.confirmationToken = response.confirmationToken;
        this.orderId = response.orderId;
      });

      await this.initYooKassaWidget();

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

  private async loadYooKassaScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.YooKassa) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://static.yoomoney.ru/checkout-client/checkout-widget.js';
      script.async = true;
      script.crossOrigin = 'anonymous';

      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load YooKassa script'));

      document.head.appendChild(script);
    });
  }

  private async initYooKassaWidget() {
    try {
      await this.loadYooKassaScript();

      if (!this.confirmationToken || !this.orderId) {
        throw new Error('Order data is missing');
      }

      const YooKassa = window.YooKassa;
      
      if (!YooKassa) {
        throw new Error('YooKassa not initialized');
      }
      
      this.destroyYooKassaWidget();

      const paymentForm = document.getElementById('payment-form');
      if (!paymentForm) {
        throw new Error('Payment form element not found');
      }

      this.yooKassaWidget = new YooKassa({
        confirmation_token: this.confirmationToken,
        return_url: `${window.location.origin}/orders/${this.orderId}`,
        error_callback: (error: { message: string }) => {
          console.error('YooKassa error:', error);
          this.setError(error.message);
        },
        embedded: true,
        modal: true,
        newDesign: true,
        success_callback: () => {
          window.location.href = `/orders/${this.orderId}`;
        },
        fail_callback: () => {
          this.setError('Payment failed');
        }
      });

      this.yooKassaWidget.render('payment-form');

    } catch (error) {
      console.error('Error initializing YooKassa widget:', error);
      this.setError(error instanceof Error ? error.message : 'Failed to initialize payment widget');
      throw error;
    }
  }

  private destroyYooKassaWidget() {
    if (this.yooKassaWidget && typeof this.yooKassaWidget.destroy === 'function') {
      this.yooKassaWidget.destroy();
      this.yooKassaWidget = null;
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
    this.confirmationToken = null;
    this.orderId = null;
    this.destroyYooKassaWidget();
  }

  destroy() {
    this.reset();
    this.destroyYooKassaWidget();
  }
} 