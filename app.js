const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const BlogList = require('./models/blog')
const logger = require('./utils/logger')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

const blogRouter = require('./controllers/blog')
const blogInfoRouter = require('./controllers/blogInfo')
app.use('/api/bloglist', blogRouter)
app.use('/info', blogInfoRouter)

morgan.token('id', function getId (req) {
  return req.id
})

morgan.token('content', function (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':id :method :url :response-time :content'))

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

module.exports = {
  app
}