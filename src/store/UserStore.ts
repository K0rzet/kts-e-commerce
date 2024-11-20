import usersService from '@/services/users.service';
import { IUser } from '@/types/users.types';
import { makeAutoObservable } from 'mobx';
import { authStore } from './AuthStore';

export class UserStore {
    user: IUser | null = null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async fetchUser(): Promise<void> {
        const user = await usersService.fetchProfile();
        this.user = user;
    }

    logout(): void {
        this.user = null;
        authStore.removeToken();
    }
}