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

export interface UserRedux {
  accessToken: string;
  userInfo?: User;
}
