import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({good,neutral,bad}) => {
  return (
    <div>
    
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>average {(good + bad)/3}</p>
    <p>positive {(good / (good + neutral + Math.abs(bad))) * 100}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodPress = () =>{
    setGood(good + 1);
  }
  const neutralPress = () =>{
    setNeutral(neutral + 1);
  }
  const badPress = () =>{
    setBad(bad - 1);
  }

  
  return(
    <div>
      <h1>give feedback</h1>
      <button onClick={goodPress}>good</button>
      <button onClick={neutralPress}>neutral</button>
      <button onClick={badPress}>bad</button>
      <br></br>
      <h1><b>statistics</b></h1>
      {(good != 0 || bad != 0 || neutral!= 0) ? 
        <Statistics good={good} neutral = {neutral} bad = {bad} />: 
        "No feedback given"}
    </div>
  )
}


ReactDOM.render( <App />, document.getElementById('root'));


