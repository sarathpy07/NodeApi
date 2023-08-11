require('dotenv').config()

const config = {
    PORT: process.env.PORT || 5000,
    Mongo_url_Atlas : process.env.Mongo_url_Atlas,
    Mongo_url_Loacal: process.env.Mongo_url_Loacal,
    NODE_ENV: process.env.NODE_ENV
}
module.exports = config;