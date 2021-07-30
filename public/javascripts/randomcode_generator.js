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

module.exports = codeGenerator