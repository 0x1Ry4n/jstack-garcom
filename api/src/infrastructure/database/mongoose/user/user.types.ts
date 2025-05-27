export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  tokens: { token: string }[];
}

export interface IUserMethods {
  generateAuthToken(): Promise<string>;
  toJSON(): IUser;
}
