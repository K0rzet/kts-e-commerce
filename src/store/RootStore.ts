import { CartStore } from './CartStore';
import { UserStore } from './UserStore';
import { ViewedProductsStore } from './ViewedProductsStore';

export class RootStore {
  cartStore: CartStore;
  userStore: UserStore;
  viewedProductsStore: ViewedProductsStore;

  constructor() {
    this.cartStore = new CartStore();
    this.viewedProductsStore = new ViewedProductsStore();
    this.userStore = new UserStore(this.cartStore);
  }
}

export const rootStore = new RootStore(); 