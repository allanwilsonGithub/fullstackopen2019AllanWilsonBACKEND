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

test('POST new blog', async () => {
    const data = {
      "title": "Robert THE Burns test_add-user",
      "author": "Robert THE Burns test_add-user",
      "url": "http://burns.gov/blog/woohoo-test-add-user",
      "likes": "69"
      }

  await api
    .post('/api/blogs')
    .send(data)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)

  let response = await api.get('/api/blogs')
  expect(response.body.length).toEqual(3)


//verify that the correct information is in the blog
  response = await api.get(`/api/blogs/${response.body[2].id}`)
  expect(response.body.title).toEqual(`Robert THE Burns test_add-user`)

})



afterAll(() => {
  mongoose.connection.close()
})
