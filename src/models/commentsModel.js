const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const commentsSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    nameAuthor: {
        type: mongoose.Schema.Types.String,
        ref:'Users'
    },
    userNameAuthor:{
        type: mongoose.Schema.Types.String,
        ref:'Users'
    },
    idPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    },
    content: {
        type: String,
        require: true
    },
}, { timestamps: true })

const PostModel = mongoose.model('Comments', commentsSchema)

module.exports = PostModel