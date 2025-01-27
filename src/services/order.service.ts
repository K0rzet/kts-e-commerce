import { instance } from '@/api/axios';
import { CreateOrderDTO } from '@/types/order.types';
import axios from 'axios';

interface OrderResponse {
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
  async createOrder(data: CreateOrderDTO): Promise<OrderResponse> {

    try {
      const response = await instance.post<OrderResponse>('/payment/checkout', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as ErrorResponse;

        if (errorData?.message) {
          throw new Error(errorData.message);
        }

        switch (error.response?.status) {
          case 400:
            throw new Error(`Invalid order data. Please check your cart items. ${error.message}`);
          case 401:
            throw new Error(`Authentication required. Please log in. ${error.message}`);
          case 404:
            throw new Error(`Products not found. They might have been removed from the store. ${error.message}`);
          case 500:
            throw new Error(`Server error. Please try again later. ${error.message}`);
          default:
            throw new Error(`Order creation failed: ${error.message}`);
        }
      }

      throw new Error(`Failed to create order. Please try again: ${error}`);
    }
  }

  async getPaidOrders() {
   const response = await instance.get('orders/mine')
   return response
  }
}

export default new OrderService();
