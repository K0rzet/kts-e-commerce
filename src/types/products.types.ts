import { ICategory } from "./category.types";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: ICategory;
}
export interface IGetProductsParams {
  limit?: number;
  offset?: number;
  title?: string;
  categoryId?: number;
}
