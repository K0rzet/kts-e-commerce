export enum Role {
  USER,
  PREMIUM,
  MANAGER,
  ADMIN,
}
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  avatarPath: string | null;
  verificationToken: string | null;
  rights: Role[];
}

export interface IFormData extends Pick<IUser, 'email'> {
  password: string;
}
