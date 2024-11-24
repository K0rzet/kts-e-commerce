import { instance, axiosClassic } from '@/api/axios';
import { CreateOrderDTO } from '@/types/order.types';
import axios from 'axios';

interface OrderResponse {
  // orderId: string;
  confirmation: {
    confirmation_url: string;
  };
}

interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

class OrderService {
  async createOrder(data: CreateOrderDTO, isAuthenticated: boolean): Promise<OrderResponse> {
    const axiosInstance = isAuthenticated ? instance : axiosClassic;
    const endpoint = isAuthenticated ? '/payment/checkout' : '/orders';

    try {
      console.log('Creating order with data:', {
        ...data,
        items: data.items,
      });

      const response = await axiosInstance.post<OrderResponse>(endpoint, data);
      console.log('Order creation response:', response.data);

      if (!response.data.confirmation.confirmation_url) {
        throw new Error('Invalid response from server');
      }

      return response.data;
    } catch (error) {
      console.error('Error in createOrder:', error);

      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as ErrorResponse;

        console.error('Server error details:', {
          status: error.response?.status,
          data: errorData,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data,
          },
        });

        // Проверяем наличие сообщения об ошибке от сервера
        if (errorData?.message) {
          throw new Error(errorData.message);
        }

        // Обрабатываем различные коды ошибок
        switch (error.response?.status) {
          case 400:
            throw new Error('Invalid order data. Please check your cart items.');
          case 401:
            throw new Error('Authentication required. Please log in.');
          case 404:
            throw new Error('Products not found. They might have been removed from the store.');
          case 500:
            throw new Error('Server error. Please try again later.');
          default:
            throw new Error(`Order creation failed: ${error.message}`);
        }
      }

      throw new Error(`Failed to create order. Please try again: ${error}`);
    }
  }
}

export default new OrderService();
