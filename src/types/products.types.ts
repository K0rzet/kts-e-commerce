export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: ICategory;
  creationAt: string;
  updatedAt: string;
}

export interface ICategory {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}
