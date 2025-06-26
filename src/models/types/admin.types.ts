export enum Role {
  ADMIN = "admin",
  SUPER_ADMIN = "super-admin",
}

export type Admin = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
};
