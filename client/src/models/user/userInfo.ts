import { Gender } from "settings/user/gender";
import { Role } from "settings/user/role";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createAt: Date;
  birthDay: Date;
  gender: Gender;
  roles: Role[];
  emailConfirmed: boolean;
  avatarUrl?: string;
}
export interface UserInfo {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  birthDay: Date;
  gender: Gender;
  roles: Role[];
  emailConfirmed: boolean;
  avatarUrl?: string;
  phoneNumber?: string;
}

export interface UserRedux {
  accessToken: string;
  userInfo?: User;
}
export interface UserUpdateInfo {
  id: string;
  firstName: string;
  lastName: string;
  birthDay?: Date;
  avatarUrl?: string;
  phoneNumber?: string;
  gender: Gender;
}
export interface UserCreateModel {
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
  email: string;
  roles: Role[];
}
