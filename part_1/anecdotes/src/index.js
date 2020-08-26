import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return(
    <div>
      <button onClick = {props.handleClick}>next anecdote</button>
      <p>{props.vote}</p>
    </div>
  
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0});
  

  const handleClick = () =>{
    setSelected(Math.floor((Math.random() * 6)))
  }

  const anotherClick = () => {
    const copy = {...vote}
    copy[selected] += 1;
    setVote(copy)
  }

  let max = 0;
  let final = 0;
  for(let total in vote){
    if(max <= vote[total]){
      final = total;
      max = vote[total];
    }
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <br></br>
      <Button handleClick={handleClick} vote={vote[selected]}/>
      <button onClick={anotherClick}>Vote</button>
      {props.anecdotes[final]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>,document.getElementById('root'));


