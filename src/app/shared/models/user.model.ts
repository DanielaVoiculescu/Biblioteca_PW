export interface Roles{
  customer?: boolean;
  admin?: boolean;
}

export interface User{
  uid?: string;
  email: string;
  photoURL: string;
  photoPath?: string;
  displayName: string;
  lastname?: string;
  address?: string;
  phoneNumber?: string;
  password?:string;
  roles: Roles;
}
