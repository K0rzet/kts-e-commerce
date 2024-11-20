// import { IUser } from '@/types/users.types';
// import { makeAutoObservable } from 'mobx';

// export class UserStore {
//     user: IUser | null = null;

//     constructor() {
//         makeAutoObservable(this, {}, { autoBind: true });
//     }

//     async fetchUser(): Promise<void> {
//         const user = await usersService.getUser();
//         this.user = user;
//     }
// }