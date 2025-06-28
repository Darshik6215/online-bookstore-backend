export enum USER_ROLE {
  USER = "user",
  ADMIN = "admin",
}

interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: Address[];
  role?: USER_ROLE;
};
