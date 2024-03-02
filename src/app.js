const express = require('express')
const { Server } = require("socket.io");

const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const serverHttp = require("http").createServer(app);
const io = new Server(serverHttp, { cors: { origin: "*" } });



//Router posts
const routerPost = require('./routers/postsRouter')
app.use('/posts', routerPost)

//Router Comments
const routerComments = require('./routers/commentsRouter')
app.use('/comments', routerComments)

const routerNotifications = require('./routers/notificationsRouter')
app.use('/notifications', routerNotifications)

//Router User
const routerUser = require('./routers/userRouter')
app.use('/', routerUser)



module.exports = {serverHttp, io}