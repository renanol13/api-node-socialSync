const mongoose = require('mongoose')
require('dotenv').config()

const dataURL = process.env.DATA_URL

const main = async () => {
    try {
        await mongoose.connect(dataURL)
        console.log('DB conectado com sucesso');
    } catch (error) {
        console.log('Error ao conectar');
    }
}

module.exports = main