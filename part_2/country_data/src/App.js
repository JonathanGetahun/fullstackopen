import React , { useState, useEffect } from 'react';

import axios from 'axios'

const Info = ({data}) => {
  return (
    <div>
      {console.log("works too")}
      {console.log(data[0])}
      <h1>{data[0].name}</h1>
      <p>capital {data[0].capital}</p>
      <p>population {data[0].population}</p>
      <h2>Spoken Languages</h2>
        {data[0].languages.map(lang => <li>{lang.name}</li>)}
        <br></br>
      <img src={data[0].flag} />

    </div>
  )
}
const Button = ({name,data}) => {
  const [clicked, changeClick] = useState(true)
  
  let correctVal = data.filter(correct => correct.name == name)

  const handleClick = (event) => {
    event.preventDefault()
    console.log("works")
    changeClick(false);
  }
  
  return (
    <div>
      
      {clicked ?
        <p>{name} <button type="submit" onClick={handleClick}>show</button></p>
        : <Info data = {correctVal}/>}
        </div>
  )
}

const Filter = ({data, searchName}) => {

  let filtered = []
  let final = []
  filtered = data.filter( country => country.name.toLowerCase().includes(searchName)) 

  if (filtered.length > 10) {
    return "Too many results, make search more precise"
  } else {
    
    final = filtered.map(names => {
        return names.name
    })
  }

  return final.map(seperate => {console.log(seperate)
    return( <Button name={seperate}  data={filtered} />)})
}

const App = () => {
const [ search, setSearch ] = useState('');
const [ data, setData ] = useState([])



  useEffect(() => {
   
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setData(response.data)
    })
    
  }, [])



const handleChange = (event) =>{
  setSearch(event.target.value)
}

  return (
    <div>
      <form> 
        <div>find countries: <input value = {search} onChange={handleChange} /> </div>
      </form>
      
      <Filter data = {data} searchName = {search} />
    </div>
  );
}

export default App;
