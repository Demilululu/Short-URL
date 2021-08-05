const Urls = require('../../models/shorturl')
const mainUrl = process.env.mainUrl || 'http://localhost:3000/'

function randomIndex(array) {
  let randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

function codeGenerator(length) {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'
  let collection = []

  collection = collection.concat(...lowerCaseLetters,...upperCaseLetters,...numbers)

  let code = ""
  for (let i = 0; i < length; i++) {
    code += randomIndex(collection)
  }
  return code
}

async function uniqueURLGenerator() {
  let testUrl = codeGenerator(5)

  await Urls.findOne({ 'shortUrl': mainUrl + testUrl })
    .then(async(result) => {
      if (result) {
        testUrl = await uniqueURLGenerator()
      }
    })
  return testUrl
}

module.exports = uniqueURLGenerator