const blogInfoRouter = require('express').Router()
const Blog = require('../models/blog')

blogInfoRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.send(`
    <p>Bloglist has info for ${blogs.length} blogs</p>
    <p>${Date()}</p>
    `)}
  )})

module.exports = blogInfoRouter