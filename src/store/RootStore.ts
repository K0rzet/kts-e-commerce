import { CartStore } from './CartStore';

export class RootStore {
  cartStore: CartStore;

  constructor() {
    this.cartStore = new CartStore();
  }
}

export const rootStore = new RootStore(); 