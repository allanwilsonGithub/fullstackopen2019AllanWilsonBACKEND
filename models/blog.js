const mongoose = require('mongoose')
const logger = require('../utils/logger')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true)

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

const url = process.env.MONGODB_URI

logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    logger.info('connected to MongoDB')
  )
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const blogSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  url:   { type: String, required: true },
  likes: Number
})


blogSchema.plugin(uniqueValidator)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)