const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI ||'mongodb://localhost/short-url'

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',(req , res) => {
  console.log('mongodb error!')
})

db.once('open',(req , res) => {
  console.log('mongodb connected!')
})

module.exports = db
