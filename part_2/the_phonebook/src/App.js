import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Add = ({name,number}) => {
  return <h5>{name.name} {number.number}</h5>
}


const App = () => {
  
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterz, setNewFilter ] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log(response.data)
    })
  })
  

  const handleChangeName = (event) =>{
    setNewName(event.target.value)
  }

  const handleChangeNumber = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleChangeFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const handleClick = (event) =>{
    event.preventDefault();
    
    if (persons.find(element => element.name === newName)) {
      window.alert(`${newName} has already been added`)
    } else {
      const addName = {name: newName, number: newNumber, id:persons.length+1}
      setPersons(persons.concat(addName))
    }
    
    setNewName('')
    setNewNumber('')
  }

  return (
    
    <div>
      <form>
        <div>
          filter shown with <input value={filterz} onChange={handleChangeFilter}/>
        </div>
      </form>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChangeName}/>
        </div>
        <div>
        number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
       {
          persons.map(person => {
            if(filterz === ""){
               return <Add name={person} number={person} key={person.id} />
            } else {
              console.log(filterz.toLowerCase())
              if(person.name.toLowerCase().includes(filterz.toLowerCase())){
                return <Add name={person} number={person} key={person.id} />
              }
            }
          })
            
        } 
  
    </div>
  )
}

export default App