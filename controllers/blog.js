const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', ('user', { username: 1, name: 1, id: 1 }))
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

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

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

  const bloglist = new Blog({
    title: body.title || false,
    author: body.author || false,
    url: body.url || false,
    likes: body.likes || false,
    user: user._id
  })

  await bloglist.save().then(savedBlog => {
    res.json(savedBlog)
  })
    .catch(error => next(error))

  user.blogs = user.blogs.concat(bloglist._id)
  await user.save()

})

blogRouter.delete('/:id', async (req, res, next) => {

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const userFromToken = await User.findById(decodedToken.id)
  console.log(userFromToken._id)

  //compare user with blog creator
  const blogToDelete = await Blog.findById(req.params.id)
  console.log(blogToDelete.user)

  if (userFromToken._id.toString() === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
      /* eslint no-unused-vars: ["error", { "args": "none" }] */
      .then(result => {
        res.status(204).end()
      })
      .catch(error => next(error))
    } else {
      return res.status(401).json({ error: 'User not authorized to delete this blog' })
    }
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