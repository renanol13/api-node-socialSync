const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },
    address: {
        type: String,
    },
    links: {
        type: String,
    }
}, { timestamps: true })

const UserModel = mongoose.model('Users', UserSchema)

module.exports = UserModel