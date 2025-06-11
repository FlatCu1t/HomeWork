import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
    id: { type: Number, required: true },
    userLogin: { type: String, required: true },
    userName: { type: String, required: true },
    avatar: { type: String },
    password: { type: String, required: true }
});

const messageSchema = new Mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    roomID: { type: String, required: true },
    messageTime: { type: String, required: true },
    messageText: { type: String, required: true },
    fromAvatar: { type: String, required: true },
    fromName: { type: String, required: true }
});

const counterSchema = new Mongoose.Schema({
  id: { type: Number, required: true }
});

const User = Mongoose.model("User", userSchema);
const Message = Mongoose.model("Message", messageSchema);
const Counter = Mongoose.model('Counter', counterSchema);

export default { User, Message, Counter };