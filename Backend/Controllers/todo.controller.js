import Todo from "../models/todo.model.js";
import User from "../models/user.model.js";

const createTodo = async (req, res) => {
    const { title , id  } = req.body;
    try {
        if (!title || !id) {
            return res.status(400).json({ msg: "Please provide all fields" });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        let todo = await Todo.create({
            isDone: false,
            title,
            user: user._id
        });
        todo = await Todo.findById(todo._id).populate('user',"-password");
        user.todos.push(todo);
        await user.save();
        await todo.save();
        res.status(201).json({
            msg: "Todo created successfully",
            finalTodo: todo
        });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}



 const GetTodo = async (req, res) => {
    const { id  } = req.body;

    try{

        if (!id) {
            return res.status(410).json({ msg: "Please provide all fields" });
        }
        const user  = await User.findById(id)
        if(!user){
            return res.status(414).json({ msg: "User not found" });
        }
        const todos = await Todo.find({user: user._id})
        res.status(200).json({
            msg: "Todos fetched successfully",
            todos: todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        })
    }catch(err){
        res.status(500).json({ msg: err.message });
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(410).json({ msg: "Please provide all fields" });
    }
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
        return res.status(414).json({ msg: "Todo not found" });
    }
    const user = await User.findById(todo.user);
    if(!user){
        return res.status(414).json({ msg: "User not found" });
    }
    const newTodos = user.todos.filter((todo) => todo._id.toString() !== id);
    user.todos = newTodos;
    await user.save();
    res.status(200).json({ msg: "Todo deleted successfully" });
}

const CheckTodo = async (req, res) => {
    const { id , isDone } = req.body;
    if (!id || isDone == null || isDone == undefined) {
        return res.status(410).json({ msg: "Please provide all fields" });
    }
    const todo = await Todo.findByIdAndUpdate(id, { isDone });
    res.status(200).json({ msg: "Todo updated successfully" });
}
const UpdateTodo = async (req, res) => {
    const { id ,title } = req.body;
    if (!id || !title) {
        return res.status(410).json({ msg: "Please provide all fields" });
    }
    await Todo.findByIdAndUpdate(id, { title });
    res.status(200).json({ msg: "Todo updated successfully" });
}

export {createTodo , deleteTodo , GetTodo , CheckTodo , UpdateTodo};