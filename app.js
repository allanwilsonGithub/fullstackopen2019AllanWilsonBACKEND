const config = require('./utils/config')
const express = require('express')
const logger = require('./utils/logger')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

const app = express()

app.use(middleware.tokenExtractor)

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const blogRouter = require('./controllers/blog')
const blogInfoRouter = require('./controllers/blogInfo')
const usersRouter = require('./controllers/users')

app.use('/api/blogs', blogRouter)
app.use('/info', blogInfoRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app
