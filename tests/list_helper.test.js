const listHelper = require('../utils/list_helper')

describe('total likes', () => {

test('of empty list is 0', () => {
  const blogs = []

  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(0)
})

test('of single entry returns number of likes for that entry', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f9',
      title: "Burns Night 3",
      author: "Robert Burns c",
      likes: 9,
      __v: 0
    }]

  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(9)
})

test('of larger list returns correct sum of likes', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f7',
      title: "Burns Night 1",
      author: "Robert Burns a",
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: "Burns Night 2",
      author: "Robert Burns b",
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: "Burns Night 3",
      author: "Robert Burns c",
      likes: 9,
      __v: 0
    }]

  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(21)
})
})

describe('favourite blog', () => {

test('of multiple blogs', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f7',
      title: "Burns Night 1",
      author: "Robert Burns a",
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: "Burns Night 2",
      author: "Robert Burns b",
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: "Burns Night 3",
      author: "Robert Burns c",
      likes: 9,
      __v: 0
    }]

  const result = listHelper.favoriteBlog(blogs)
  expect(result).toEqual(
      {
      title: "Burns Night 3",
      author: "Robert Burns c",
      likes: 9
    }
  )
})

test('of empty array', () => {
  const blogs = []

  const result = listHelper.favoriteBlog(blogs)
  expect(result).toBe("Not enough blogs to compare")
})

test('of single blog', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f9',
      title: "Burns Night 3",
      author: "Robert Burns c",
      likes: 9,
      __v: 0
    }
  ]

  const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(
      {
      title: "Burns Night 3",
      author: "Robert Burns c",
      likes: 9
    }
  )
})
})