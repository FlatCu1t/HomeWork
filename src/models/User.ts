import { Schema, model } from 'mongoose';

interface IUser {
  login: string,
  password: string,
  avatar: string
}

const userSchema = new Schema<IUser>({
  login: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: "https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1" }
}, { timestamps: true });

export default model<IUser>('User', userSchema);