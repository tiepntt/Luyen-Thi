export interface LoginModel {
  username: string;
  password: string;
}
export interface RegisterModel {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDay: Date;
  confirmPassword: string;
}
