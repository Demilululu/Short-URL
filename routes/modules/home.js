const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const uniqueURLGenerator = require('../../public/javascripts/randomcode_generator')
const Urls = require('../../models/shorturl')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async (req, res) => {
  const original_url = req.body.original_url
  let short_url = await uniqueURLGenerator()

  if (validUrl.isUri(original_url) === undefined) {
    const error_message = `${original_url} 並非有效的網址，請重新輸入`
    console.log(error_message)
    return res.render('index', { error_message })
  }

  Urls.findOne({ 'original_url': original_url })
    .lean()
    .then(result => {
      if (result) {
        short_url = result.short_url
        return res.render('index', { original_url, short_url })
      }
      Urls.create({ original_url, short_url })
        .then(() => res.render('index', { original_url, short_url }))
    })
    .catch((error) => console.log(error))
})

module.exports = router