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
  items: number[];
  email?: string;
  city: string;
  house: string;
  apartment: string;
} 