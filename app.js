const config = require('./utils/config')
const express = require('express')
const logger = require('./utils/logger')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const errorHandler = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const blogRouter = require('./controllers/blog')
const blogInfoRouter = require('./controllers/blogInfo')
app.use('/api/blogs', blogRouter)
app.use('/info', blogInfoRouter)

app.use(errorHandler)

module.exports = app
