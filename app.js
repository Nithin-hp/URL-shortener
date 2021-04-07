const express = require('express')
const app = express()
const mongoose = require('mongoose')

// Include controller
const convertController = require('./controllers/convert')
const homeController = require('./controllers/home')

// Include user model
const Url = require('./models/url')


const port = 3000

// connect mongoose with database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

const db = mongoose.connection

// error connection
db.on('error', () => {
  console.log('mongodb error!')
})

// successful connection
db.once('open', () => {
  console.log('mongodb connected!')
})




app.get('/', homeController)

app.get('/convert', convertController.getShortened)

app.get('/:shortenedUrl', convertController.getOriginal)

app.listen(process.env.PORT || port, () => {
  console.log('App is running')
})