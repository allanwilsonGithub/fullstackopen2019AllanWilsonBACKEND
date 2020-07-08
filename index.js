require('dotenv').config()
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

morgan.token('id', function getId (req) {
  return req.id
})

morgan.token('content', function (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':id :method :url :response-time :content'))

app.get('/api/blogList', (req, res) => {
  BlogList.find({}).then(blogs => {
    res.json(blogs)
  })
})

app.get('/info', (req, res) => {
  BlogList.find({}).then(blogs => {
    res.send(`
    <p>Bloglist has info for ${blogs.length} blogs</p>
    <p>${Date()}</p>
    `)}
  )})

app.get('/api/bloglist/:id', (req, res, next) => {
  BlogList.findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/bloglist/:id', (req, res, next) => {
  BlogList.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(blog => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/bloglist/:id', (req, res, next) => {
  BlogList.findByIdAndRemove(req.params.id)
    /* eslint no-unused-vars: ["error", { "args": "none" }] */
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})



app.post('/api/bloglist', (req, res, next) => {
  const body = req.body
  if (!body.title) {
    return res.status(400).json({
      error: 'title missing'
    })
  } else if (!body.author) {
    return res.status(400).json({
      error: 'author missing'
    })
  } else if (!body.url) {
    return res.status(400).json({
      error: 'url missing'
    })
  } else if (!body.likes) {
    return res.status(400).json({
      error: 'likes missing'
    })
  }
  const bloglist = new BlogList({
    title: body.title || false,
    author: body.author || false,
    url: body.url || false,
    likes: body.likes || false
  })

  bloglist.save().then(savedBlog => {
    res.json(savedBlog)
  })
    .catch(error => next(error))

})

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