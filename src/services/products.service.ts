import axios from 'axios';
import { API_URL } from '../config/api.config';
import { IProduct } from '../types/products.types';


class ProductsService {
  async getProducts(limit?: number, offset?: number, title?: string) {
    let requestUrl = `${API_URL}/products`;
    if (limit) requestUrl += `?limit=${limit}&offset=${offset ? offset : 0}`;
    if (title) {
      if (requestUrl.includes('?')) {
        requestUrl += `&title=${title}`;
      } else {
        requestUrl += `?title=${title}`;
      }
    }

    return axios.get<IProduct[]>(requestUrl);
  }

  async getProduct(id: number) {
    return await axios.get<IProduct>(`${API_URL}/products/${id}`);
  }

  async getProductsByCategory(
    categoryId: number,
    limit?: number,
    offset?: number
  ): Promise<IProduct[]> {
    const response = await axios.get(`${API_URL}/categories/${categoryId}/products`, {
      params: {
        limit,
        offset,
      },
    });
    return response.data;
  }
}

export default new ProductsService();
