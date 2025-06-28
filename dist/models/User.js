import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String }
});
export default model('User', UserSchema);
