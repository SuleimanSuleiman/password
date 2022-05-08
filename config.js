require('dotenv').config()

module.exports = {
    port: process.env.PORT,
    database:{
        dburl: process.env.DBURL
    }
}