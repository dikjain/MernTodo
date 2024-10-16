import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isDone : {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }   
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
