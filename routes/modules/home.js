const express = require('express')
const validUrl = require('valid-url')
const Urls = require('../../models/shorturl')
const uniqueURLGenerator = require('../../public/javascripts/randomcode_generator')

const router = express.Router()
const mainUrl = process.env.mainUrl || 'http://localhost:3000/'

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const originalUrl = req.body.originalUrl
  let shortUrl = ""

  if (validUrl.isUri(originalUrl) === undefined) {
    const errorMessage = `${originalUrl} 並非有效的網址，請重新輸入`
    return res.render('index', { errorMessage })
  }

  Urls.findOne({ originalUrl })
    .lean()
    .then(async (result) => {
      if (result) {
        shortUrl = result.shortUrl
        return res.render('index', { shortUrl })
      }
      const shortUrlCode = await uniqueURLGenerator()
      shortUrl = mainUrl + shortUrlCode
      Urls.create({ originalUrl, shortUrl })
        .then(() => res.render('index', { shortUrl }))
    })
    .catch((error) => res.redirect('/'))
})

router.get('/:code', (req, res) => {
  const id = req.params.code
  const shortUrl = mainUrl + id

  Urls.findOne({ shortUrl })
    .lean()
    .then((result) => res.redirect(result.originalUrl))
    .catch((error) => res.redirect('/'))
})

module.exports = router