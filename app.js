const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

require('./config/mongoose')
const routes = require('./routes/index')
const PORT = 3000

const app = express()

app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine','hbs')
app.use(express.static(public))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(PORT, () => {
  console.log(` App is now listening on https://localhost:${PORT}`)
})
