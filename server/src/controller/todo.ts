import { Request, Response } from "express";
import Todo from "../models/Todo";

interface TodoData {
    day: String;
    todo: String;
}

// create Todo
export const createTodo = async (req: Request, res: Response) => {
    try {
        const input: TodoData = req.body;
        const userId = req.headers["userId"];

        const newTodo = await Todo.create({ day: input.day, todo: input.todo, userId });
        console.log(newTodo);
        return res.status(200).json(newTodo);

    } catch (err) {
        return res.status(500).json(err);
    }
}

// getTodo
export const getTodo = async (req: Request, res: Response) => {
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
export const getOneTodo = async (req: Request, res: Response) => {
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
export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { todoId } = req.params;
        const input: TodoData = req.body;
        const userId = req.headers["userId"];
        const response = await Todo.findByIdAndUpdate({ _id: todoId, userId: userId }, { day: input.day, todo: input.todo }, { new: true });
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
export const deleteTodo = async (req: Request, res: Response) => {
    try {
        console.log("first");
        const { id } = req.params;
        const response = await Todo.findByIdAndDelete({ _id: id });
        console.log("Response of todo ", response);
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