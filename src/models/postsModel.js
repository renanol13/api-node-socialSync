const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const postSchema = new Schema({
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
    content: {
        type: String,
        require: true
    },
    likes: [
        {
            author: mongoose.Schema.Types.ObjectId,
            nameAuthor: mongoose.Schema.Types.String
        }
    ]
}, { timestamps: true })

const PostModel = mongoose.model('Posts', postSchema)

module.exports = PostModel