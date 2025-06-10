import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
    workID: { type: Number, required: true },
    workName: { type: String, required: true },
    workDate: { type: String, required: true },
    workImage: { type: String, required: true }
});

const WorkSchema = mongoose.model("WorkSchema", workSchema);
export default WorkSchema;