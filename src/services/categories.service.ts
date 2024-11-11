import axios from 'axios';
import { ICategory } from '../types/category.types';
import { API_URL } from '../config/api.config';


export class CategoriesService {
  async getCategories(): Promise<ICategory[]> {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  }
}

export default new CategoriesService(); 