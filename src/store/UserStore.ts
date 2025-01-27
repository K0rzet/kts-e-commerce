import usersService from '@/services/users.service';
import { IUser } from '@/types/users.types';
import { makeAutoObservable } from 'mobx';
import { authStore } from './AuthStore';
import { CartStore } from './CartStore';

export class UserStore {
    user: IUser | null = null;
    private cartStore: CartStore;

    constructor(cartStore: CartStore) {
        this.cartStore = cartStore;
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async fetchUser(): Promise<void> {
        const user = await usersService.fetchProfile();
        this.user = user;
        this.cartStore.loadCart();
    }

    logout(): void {
        this.user = null;
        authStore.removeToken();
        this.cartStore.reset();
    }
}