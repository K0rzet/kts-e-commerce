export interface OrderFormData {
  email: string;
  city: string;
  house: string;
  apartment: string;
}

export interface CreateOrderResponse {
  orderId: string;
  confirmationToken: string;
}

export interface CreateOrderDTO {
  cartItemIds: number[];
  email?: string;
  city: string;
  house: string;
  apartment: string;
} 