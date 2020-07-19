const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

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

describe('Blog List: when there is initially 2 blogs in db', () => {
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

    //verify that the correct number of blogs are returned
    let response = await api.get('/api/blogs')
    expect(response.body.length).toEqual(3)

    //verify that the correct information is in the blog
    response = await api.get(`/api/blogs/${response.body[2].id}`)
    expect(response.body.title).toEqual(`Robert THE Burns test_add-user`)
  })

  test('missing likes entry defaults likes to 0', async () => {
    const data = {
      "title": "Title. Missing likes entry test",
      "author": "Author. Missing likes entry test",
      "url": "http://burns.gov/blog/Missing-likes-entry-test"
    }

    await api
      .post('/api/blogs')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)

    //verify that the correct number of blogs are returned
    let response = await api.get('/api/blogs')
    expect(response.body.length).toEqual(3)

    //verify that the correct information is in the blog
    response = await api.get(`/api/blogs/${response.body[2].id}`)
    expect(response.body.likes).toEqual(0)
  })

  test('Title missing returns 400 error', async () => {
    const data = {
      "author": "Robert THE Burns test_add-user",
      "url": "http://burns.gov/blog/woohoo-test-add-user",
      "likes": "69"
    }

    await api
      .post('/api/blogs')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
  })

  test('URL missing returns 400 error', async () => {
    const data = {
      "title": "Random title",
      "author": "Robert THE Burns test_add-user",
      "likes": "69"
    }

    await api
      .post('/api/blogs')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
  })
})

describe('User Administration: when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

    test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})