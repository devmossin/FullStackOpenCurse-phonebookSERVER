const express = require('express')
const app = express()

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const date = Date()

app.use(express.json()) // <--- ESSA LINHA É A CHAVE!


// GET

app.get('/api/persons', (request, response) => {
    response.json(phonebook)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = phonebook.find(contact => contact.id === id)

    if (contact) {
        response.json(contact)
    } 
    else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    response.send(        
        `<p>Phonebook has info for ${phonebook.length}</p>
        <p>${date}</p>`
    )
})

// DELETE

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    phonebook = phonebook.filter(contact => contact.id !== id)

    response.status(204).end()
})

// POST

app.post('/api/persons', (request, response) => {
    const body = request.body


    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    if (phonebook.find(contact => contact.name === body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const maxId = phonebook.length > 0
    ? Math.max(...phonebook.map(contact => contact.id))
    : 0

    const contact = {
        id: maxId + 1,
        name: body.name,
        number: body.number
    }

    phonebook = phonebook.concat(contact)

    response.json(contact)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})