import { CartStore } from './CartStore';
import { ThemeStore } from './ThemeStore';
import { UserStore } from './UserStore';
import { ViewedProductsStore } from './ViewedProductsStore';

export class RootStore {
  cartStore: CartStore;
  userStore: UserStore;
  viewedProductsStore: ViewedProductsStore;
  themeStore: ThemeStore;

  constructor() {
    this.cartStore = new CartStore();
    this.viewedProductsStore = new ViewedProductsStore();
    this.themeStore = new ThemeStore();
    this.userStore = new UserStore(this.cartStore);
  }
}

export const rootStore = new RootStore();
