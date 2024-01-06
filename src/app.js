const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

app.use(express.json())

const db = require('./dataBase/connection')
db()


//Router posts
const routerPost = require('./routers/postsRouter')
app.use('/posts', routerPost)

//Router Comments
const routerComments = require('./routers/commentsRouter')
app.use('/comments', routerComments)

//Router User
const routerUser = require('./routers/userRouter')
app.use('/', routerUser)

module.exports = app