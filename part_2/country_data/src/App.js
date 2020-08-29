import React , { useState, useEffect } from 'react';

import axios from 'axios'

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
    return<li>{seperate}</li>})
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
