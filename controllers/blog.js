const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.get('/:id', async (req, res, next) => {
  await Blog.findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogRouter.post('/', async (req, res, next) => {
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
    body.likes = 0
  }

  const randomUser = await User.find({})

  const bloglist = new Blog({
    title: body.title || false,
    author: body.author || false,
    url: body.url || false,
    likes: body.likes || false,
    user: {
      username: randomUser[0].username,
      name: randomUser[0].name,
      id: randomUser[0].id
    }
  })

  await bloglist.save().then(savedBlog => {
    res.json(savedBlog)
  })
    .catch(error => next(error))
})

blogRouter.delete('/:id', async (req, res, next) => {
  await Blog.findByIdAndRemove(req.params.id)
    /* eslint no-unused-vars: ["error", { "args": "none" }] */
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

blogRouter.put('/:id', async (req, res, next) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(blog => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})


module.exports = blogRouter