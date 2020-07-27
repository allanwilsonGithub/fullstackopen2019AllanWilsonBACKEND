const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useCreateIndex', true)

const blogSchema = new mongoose.Schema ({
  author: { type: String, required: true },
  title: { type: String, required: true },
  url:   { type: String, required: true },
  likes: Number,
  user: {
    username: { type: String, required: true },
    name: { type: String, required: true },
    id: { type: String, required: true }
  }
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