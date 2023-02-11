// require(dotenv)
const mongoose = require('mongoose');
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const uri = process.env.MONGO_URI.replace("<password>", password);

const connect = async () => {
  mongoose
    .set('strictQuery', false)
    .connect(uri, { 
      keepAlive: true, 
      keepAliveInitialDelay: 300000,
      useUnifiedTopology: true,
      useNewUrlParser: true

    })
    .then(() => console.log("Successfully connected to database!"))
    .catch(e => console.log(e));
}

module.exports = connect;