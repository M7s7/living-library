const mongoose = require('mongoose');
require('dotenv').config();

const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const uri = process.env.MONGO_URI.replace("<password>", password);

const connect = async () => {
  mongoose
    .set('strictQuery', false)
    .connect(uri, { 
      keepAlive: true, 
      keepAliveInitialDelay: 300000 
    })
    .then(() => console.log("Successfully connected to mongoDB!"))
    .catch(e => console.log(e));
}

module.exports = connect;