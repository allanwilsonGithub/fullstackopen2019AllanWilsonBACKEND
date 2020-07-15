const blogInfoRouter = require('express').Router()
const Blog = require('../models/blog')

blogInfoRouter.get('/', async (req, res) => {
  await Blog.find({}).then(blogs => {
    res.send(`
    <p>Bloglist has info for ${blogs.length} blogs</p>
    <p>${Date()}</p>
    `)}
  )})

module.exports = blogInfoRouter