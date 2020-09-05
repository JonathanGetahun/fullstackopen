require('dotenv').config()
const Entry = require('./models/mongo')
const express = require("express");
const { response } = require("express");
const app = express();
const morgan = require('morgan')
const cors = require('cors')



//middleware to convert JSON strings from requests to whatever required 
app.use(express.json())
app.use(morgan('tiny'))
//useful for making sure I can use two different servers in the browser
app.use(cors())
app.use(express.static('build'))


let phonebook = [
     {
        "name":"Arto Hell",
        "number": "040-8080",
        "id":1
     },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    
]



app.get('/info', (req, res) => {
    res.send(`<h3>phonebok has info for ${phonebook.length} people</h3>
    <p>${new Date()}</p>`)
})

app.get('/api/persons', (req,res) => {
    Entry.find({}).then(entries => {
        res.json(entries)
    })
})

app.get('/api/persons/:id', (req,res) => {
  Entry.findById(req.params.id).then(note => {
        res.json(note) }) 
})

app.delete('/api/persons/:id', (req, res) => {
    phonebook = phonebook.filter(name => Number(req.params.id) !== name.id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const {name, number} = req.body

    if(!name|| !name){
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const entry = new Entry({
        name: name,
        number: number
    })

    entry.save().then(savedEntry => {
        res.json(savedEntry)
    })

    // const check = phonebook.find(names => names.name === name.name)
    // if(check) {
    //     return res.status(400).json({
    //         error: 'name already exists'
    //     })
    // }

})


//Create a web server and listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})