import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  blogs?: unknown[];
  comparePasswords(candidatePassword: string): Promise<boolean>;
}
