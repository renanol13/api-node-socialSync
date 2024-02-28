const { serverHttp } = require('./src/app')
const ConnectSocket = require('./src/Socket.io/index')
const mainDB = require('./src/dataBase/connection')

const PORT = process.env.PORT ||  3001

serverHttp.listen(PORT, () => {
    mainDB()
    ConnectSocket()
    console.log('Servidor rodando na porta'+ PORT);
})
