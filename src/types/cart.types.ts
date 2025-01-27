import { IProduct } from './products.types';

export interface CartItem {
  userId?: string;
  id: number;
  product: IProduct;
  quantity: number;
  selected: boolean;
}
