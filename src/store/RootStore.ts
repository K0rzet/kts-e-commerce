import { CartStore } from './CartStore';
import { UserStore } from './UserStore';

export class RootStore {
  cartStore: CartStore;
  userStore: UserStore;
  constructor() {
    this.cartStore = new CartStore();
    this.userStore = new UserStore(this.cartStore);
  }
}

export const rootStore = new RootStore(); 