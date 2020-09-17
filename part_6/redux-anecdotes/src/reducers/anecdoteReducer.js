const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

///make sure to return state as a new object, you can't just return the updated version
/// as an array with state passed in through spread operator and the updated vote at the end
//things created and destoyed should always be copies.
const reducer = (state = initialState, action) => {
  switch(action.type){
    case 'INCREMENT':
      const updated = state.find(voter => voter.id === action.data.id)
      const changedVote = {
        ...updated,
        votes: updated.votes + 1
      }
      return state.map(voter => voter.id !== action.data.id ? voter : changedVote)
    case 'New_Anecdote':
      return [...state, action.data]
    default:
      return state
  }

}

//action creators are usally sent to their own components so they can be called by dispatch 
//from App, in the end the App component should be as bare as possible.
export const vote = (id) => {
  return {
    type:'INCREMENT',
    data:{
      "id": id
    }
  }
}



export const createAnecdote = (content) => {
  return {
    type: 'New_Anecdote',
    data: {
      content,
      id:getId(),
      votes:0
    }
}
}
export default reducer