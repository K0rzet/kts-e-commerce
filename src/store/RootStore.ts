import QueryParamsStore from './QueryParamsStore';
import CategoryStore from './CategoryStore';
import ProductsStore from './ProductsStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly categories = new CategoryStore();
  readonly products = new ProductsStore();
}

export const rootStore = new RootStore(); 