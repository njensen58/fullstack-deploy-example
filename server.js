const express = require('express')
const app = express()
require('dotenv').config()  // Creates the abillity to use .env files
const morgan = require("morgan")
const mongoose = require('mongoose')
const expressJwt = require('express-jwt') // Gatekeeper/Security checkpoint
const path = require('path')
const PORT = process.env.PORT || 7000

// Global middleware
app.use(express.json())
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, "client", "build"))) // Really really important

// DB connect
mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost:27017/token-auth-1",
    {
        useNewUrlParser:  true,
        useFindAndModify: false,
        useCreateIndex:   true
    },
    () => console.log("connected to the DB")
)

// Routes
app.use("/auth", require('./routes/authRouter.js'))

// Creates a 'security-gate' for any request going to /api/anything else
// Decode given token, and create a req.user
app.use("/api", expressJwt({secret: process.env.SECRET})) // req.user._id
app.use("/api/todo", require('./routes/todoRouter.js'))


// Error Handler
app.use((err, req, res, next) => {
    console.error(err)
    if(err.name === "UnauthorizedError"){ // if expressJwt does not find a token / throws an error.
        res.status(err.status)
    }
    return res.status(500).send({errMsg: err.message})
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})

// Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))