const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

// Signup - POST
    // Does the user with the username already exist
        // throw error ("Username already exists")
    // create the new user and save in the db
    // send back the New user object, & a token
authRouter.post("/signup", (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        // Does that user already exists/username is taken
        if(user !== null){
            res.status(400)
            return next(new Error("That username already exists!"))
        }
        // Create user
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            // Create the token, send token and user object to the front-end
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({ user: savedUser.withoutPassword(), token })
        })
    })
})


// Login - POST
    // Does the username requested exist in the DB
    // Does the password match the user's password in the DB
    // Create token
    // Send user object and token to front-end
authRouter.post("/login", (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500)
            return next (err)
        }
        // Does the user exist 
        if(!user){
            res.status(500)
            return next(new Error("Username or password are incorrect"))
        }
        // Does the user's password attempt match the encrypted password in the DB
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            // Did the user's password match
            if(!isMatch){
                res.status(401)
                return next(new Error("Username or Password are incorrect"))
            }
            // Create token and send token/user object to front-end
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ user: user.withoutPassword(), token })
        })
    })
})

module.exports = authRouter