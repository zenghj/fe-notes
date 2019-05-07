const mongoose = require('mongoose')
const config = require('./config')
mongoose.Promise = global.Promise

const connect = () => {
  return mongoose
    .connect(config.mongodbUri, {
      // useMongoClient: true
      useNewUrlParser: true
    })
    .then(
      () => {
        console.log('mongodb connect success')
      },
      err => {
        console.error(err)
      }
    )
}

module.exports = {
  connect
}
