"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
let todos = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/', (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
});
router.put('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    const todoIndex = todos.findIndex((todoItem) => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: req.body.text };
        return res.status(200).json({ message: 'updated todo', todos: todos });
    }
    return res.status(401).json({ message: 'Couldn not find todo for this id' });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const tid = req.params.todoId;
    todos = todos.filter((todoItem) => todoItem.id !== tid);
    return res.status(200).json({ message: 'Deleted todo', todos: todos });
});
exports.default = router;