import express from "express"
const router = express.Router();

import { createTodo, getTodo, updateTodo, deleteTodo, getOneTodo } from "../controller/todo";
import { auth } from "../middleware/auth";


router.post('/createTodo', auth, createTodo);
router.put('/updateTodo/:todoId', auth, updateTodo);
router.delete('/deleteTodo/:id', auth, deleteTodo);
router.get('/getTodo', auth, getTodo);
router.get('/getOneTodo/:id', auth, getOneTodo);


export default router;