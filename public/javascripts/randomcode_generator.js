const Urls = require('../../models/shorturl')

function randomIndex(array) {
  let random_Index = Math.floor(Math.random() * array.length)
  return array[random_Index]
}


function codeGenerator(length) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '1234567890'
  let collection = []

  collection = collection.concat(...lowerCaseLetters, ...numbers)

  let code = ""
  for (let i = 0; i < length; i++) {
    code += randomIndex(collection)
  }
  return code
}

async function uniqueURLGenerator() {
  const url_protocol = 'http://'
  const url_host = 'www.hahahahaha/'
  let test_url = url_protocol + url_host + codeGenerator(5)

  await Urls.findOne({ 'short_url': test_url })
    .then((result) => {
      if (result) {
        uniqueURLGenerator()
      }
    })
  return test_url
}

module.exports = uniqueURLGenerator