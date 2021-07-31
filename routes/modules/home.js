const express = require('express')
const validUrl = require('valid-url')
const Urls = require('../../models/shorturl')
const uniqueURLGenerator = require('../../public/javascripts/randomcode_generator')

const router = express.Router()
const main_url = process.env.mainUrl || 'http://localhost:3000/'

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async (req, res) => {
  const original_url = req.body.original_url
  const short_url_code = await uniqueURLGenerator()
  let short_url

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
        return res.render('index', { short_url })
      }
      short_url = main_url + short_url_code
      Urls.create({ original_url, short_url })
        .then(() => res.render('index', { short_url }))
    })
    .catch((error) => console.log(error))
})

router.get('/:code', (req, res) => {
  const url_id = req.params.code
  const short_url = main_url + url_id

  Urls.findOne({ 'short_url': short_url })
    .lean()
    .then((result) => res.redirect(result.original_url))
    .catch((error) => res.redirect('/'))
})

module.exports = router