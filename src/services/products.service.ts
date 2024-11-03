import axios from 'axios';
import { API_URL } from '../config/api.config';
import { IProduct } from '../types/products.types';

class ProductsService {
  async getProducts(limit?: number, offset?: number) {
    let url = `${API_URL}/products`;

    if (limit && offset !== undefined && offset >= 0) {
      url += `?limit=${limit}&offset=${offset}`;
    }
    return await axios.get<IProduct[]>(url);
  }

  async getProduct(id: number) {
    return await axios.get<IProduct>(`${API_URL}/products/${id}`);
  }
}

export default new ProductsService();
