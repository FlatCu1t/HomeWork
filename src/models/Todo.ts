import { Schema, model } from 'mongoose';

interface ITodo {
  todoID: string,
  todoOwner: string,
  todoTitle: string,
  todoIsDone: boolean
}

const todoSchema = new Schema<ITodo>({
  todoID: { type: String, required: true },
  todoOwner: { type: String, required: true },
  todoTitle: { type: String, required: true },
  todoIsDone: { type: Boolean }
}, { timestamps: true });

export default model<ITodo>('Todo', todoSchema);