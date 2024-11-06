require('dotenv').config()
const express = require('express')

const connectDB = require('./config/database')
const redisClient = require('./config/redisClient');
const loadController = require('./helper/loadController')
const app = express()

connectDB()

app.cache = redisClient;

app.use(express.json())

app.get('/ping', (req, res) => {
  res.send({
    message: 'pong!'
  })
})

loadController(app)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`)
})
