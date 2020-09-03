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
    res.json(phonebook);
})

app.get('/api/persons/:id', (req,res) => {
    const name = phonebook.find(person => person.id === Number(req.params.id))
    if(name){
        return res.json(name)
    } else {
        return res.status(404).end()
    }
    
})

app.delete('/api/persons/:id', (req, res) => {
    phonebook = phonebook.filter(name => Number(req.params.id) !== name.id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const name = req.body

    if(!name.name || !name.number){
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const check = phonebook.find(names => names.name === name.name)
    if(check) {
        return res.status(400).json({
            error: 'name already exists'
        })
    }
    const maxId = phonebook.length > 0 
    ? (Math.random() * 100) + phonebook.length
    : 0
     name.id = maxId + 1

    phonebook = phonebook.concat(name)

    res.json(phonebook)
})


//Create a web server and listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})