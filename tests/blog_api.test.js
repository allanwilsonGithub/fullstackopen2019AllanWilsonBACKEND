const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialTestBlogs = [
  {
    'title': 'Burns DAY',
    'author': 'Robert Scalds',
    'url': 'http://burns.gov/blog/woohoo',
    'likes': 9,
    'id': '5efbc1008d691b6a74cb5991'
  },
  {
    'title': 'Burns NIGHT',
    'author': 'Robert Burns',
    'url': 'http://burns.gov/blog/woohaa',
    'likes': 1,
    'id': '5f0637defbc4d6377999a4d8'
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialTestBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialTestBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('2 blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toEqual(2)
})

test('id is defined', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('id_ is not defined', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0]._id).not.toBeDefined()
})


afterAll(() => {
  mongoose.connection.close()
})
