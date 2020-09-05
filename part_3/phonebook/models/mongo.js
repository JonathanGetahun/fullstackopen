const mongoose = require('mongoose')


  const url = process.env.MONGODB_URI

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  const entrySchema = new mongoose.Schema({
      name: String, 
      number: Number, 
  })

  entrySchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })



  module.exports = mongoose.model('Entry', entrySchema)