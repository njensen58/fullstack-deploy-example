const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    joined: {
        type: Date,
        default: Date.now
    }
})


// Pre-save hook that encrypts user's password on Signup
userSchema.pre("save", function(next){
    const user = this
    if(!user.isModified("password")) return next()
            // string to encrypt // salt_rounds => for encryption algorithm
    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err)
        user.password = hash
        next()
    })
})

// Check user's password attempt against encrypte password in database, return boolean on weather or not th ey match
userSchema.methods.checkPassword = function(passwordAttempt, callback){
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
        if(err) return callback(err)
        callback(null, isMatch)
    })
}   

// Removes user's hashed password from user object before 
    // adding user object as payload to the token
    // sending the user object back to the front end
userSchema.methods.withoutPassword = function(){
    const user = this.toObject()
    delete user.password
    return user
}

module.exports = mongoose.model("User", userSchema)