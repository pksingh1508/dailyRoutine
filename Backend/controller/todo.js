
const Todo = require("../models/Todo");

// create Todo
exports.createTodo = async (req, res) => {
    try {
        const { day, todo } = req.body;
        const userId = req.headers["userId"];

        const newTodo = await Todo.create({ day: day, todo: todo, userId });
        console.log(newTodo);
        return res.status(200).json(newTodo);

    } catch (err) {
        return res.status(500).json(err);
    }
}

// getTodo
exports.getTodo = async (req, res) => {
    try {
        const userId = req.headers["userId"];
        const response = await Todo.find({ userId: userId });
        if (response) {
            return res.status(200).json({
                success: true,
                message: response
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while getting Todo"
        })
    }
}
// get One todo
exports.getOneTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers["userId"];
        const response = await Todo.findOne({ _id: id, userId: userId });
        if (response) {
            return res.status(200).json({
                success: true,
                message: response
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while getting Todo"
        })
    }
}

// updateTodo
exports.updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { day, todo } = req.body;
        const userId = req.headers["userId"];
        const response = await Todo.findByIdAndUpdate({ _id: todoId, userId: userId }, { day: day, todo: todo }, { new: true });
        if (response) {
            return res.status(200).json({
                success: true,
                message: "Todo updated successfully",
                response
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating todo"
        })
    }
}

// deleteTodo
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Todo.findByIdAndDelete({ _id: id });
        // console.log("Response of todo ", response);
        if (response) {
            return res.status(200).json({
                success: true,
                message: "Todo deleted successfully",
                response
            })
        }
        else {
            console.log("not response");
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting todos"
        })
    }
}