import { Schema, model } from 'mongoose';

export interface IUser {
  name: string;
  phone: string;
  username: string;
  email: string;
  avatar: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String }
});

export default model<IUser>('User', UserSchema);