
const express = require("express")
const router = express.Router();

const { createTodo, getTodo, updateTodo, deleteTodo, getOneTodo } = require('../controller/todo');
const { auth } = require('../middleware/auth');


router.post('/createTodo', auth, createTodo);
router.put('/updateTodo/:todoId', auth, updateTodo);
router.delete('/deleteTodo/:id', auth, deleteTodo);
router.get('/getTodo', auth, getTodo);
router.get('/getOneTodo/:id', auth, getOneTodo);


module.exports = router;