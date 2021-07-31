const Urls = require('../../models/shorturl')

function randomIndex(array) {
  let random_Index = Math.floor(Math.random() * array.length)
  return array[random_Index]
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
  let test_url = codeGenerator(5)

  await Urls.findOne({ 'short_url': test_url })
    .then((result) => {
      if (result) {
        uniqueURLGenerator()
      }
    })
  return test_url
}

module.exports = uniqueURLGenerator