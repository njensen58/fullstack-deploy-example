const express = require('express')
const todoRouter = express.Router()
const Todo = require('../models/todo.js')

// Post 
todoRouter.post("/", (req, res, next) => {
    // Add user ID to the Todo Object
    req.body.user = req.user._id
    const newTodo = new Todo(req.body)
    newTodo.save((err, savedTodo) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedTodo)
    })
})

// Get todos by requesting user
todoRouter.get("/", (req, res, next) => {
    // Find the todo's that have .user that === the requesting.user's _id
    Todo.find({user: req.user._id}, (err, todos) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(todos)
    })
})

// Delete a Todo belonging to logged in user
todoRouter.delete("/:todoId", (req, res, next) => {
    Todo.findOneAndRemove(
        // find the todo with the req.params._id and make sure it has the same user ._id as the user requesting removal
        {_id: req.params.todoId, user: req.user._id}, 
        (err, deletedTodo) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send({msg: `Todo with title ${deletedTodo.title} was deleted`, deletedTodo})
    })
})

module.exports = todoRouter