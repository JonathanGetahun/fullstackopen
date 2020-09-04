const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }
  
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]

  const url = `mongodb+srv://jkidd22:${password}@helenskitest.vo4jr.mongodb.net/<dbname>?retryWrites=true&w=majority`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

  const entrySchema = new mongoose.Schema({
      name: String, 
      number: Number, 
  })

  const Entry = mongoose.model('Entry', entrySchema)

  const entry = new Entry({
      name: name,
      number: number
  })

  entry.save().then(result => {
      console.log(`added ${name} number ${number}`)
  })

  Entry.find({}).then(result => {
      result.forEach(note => {
          console.log(note)
      })
      mongoose.connection.close()
  })