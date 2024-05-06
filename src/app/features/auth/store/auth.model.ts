export interface AuthLoginModel {
  email: string;
  password: string;
  user: UserModel;
}

export interface AuthSignupModel {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  password: string;
}
export interface UserModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
}
