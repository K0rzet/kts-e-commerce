import axios from 'axios';
import { API_URL } from '@/config/api.config';
import { IGetProductsParams, IProduct } from '@/types/products.types';

interface IGetProductsResponse {
  products: IProduct[];
  total: number;
}

class ProductsService {
  private requestUrl = `${API_URL}/products`;

  async getProducts({limit, offset, title, categoryId}: IGetProductsParams) {
    return axios.get<IGetProductsResponse>(this.requestUrl, { params: { limit, offset, title, categoryId } });
  }

  async getProduct(id: number) {
    return await axios.get<IProduct>(`${this.requestUrl}/${id}`);
  }
}

export default new ProductsService();
