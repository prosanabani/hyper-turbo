export class User {
  id: number;
  name: string;
  password: string;
  username: string;
  roles: string[];
  isAccountDisabled: boolean;
  email: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
