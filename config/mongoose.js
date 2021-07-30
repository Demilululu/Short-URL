const mongoose = require('mongoose')
const MONGODB_URL = 'mongodb://localhost/shorturl'

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',(req , res) => {
  console.log('mongodb error!')
})

db.once('open',(req , res) => {
  console.log('mongodb connected!')
})

module.exports = db
