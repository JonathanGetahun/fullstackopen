const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const goodUpdated = initialState.good ++
      
      return {...state, good:goodUpdated}
    case 'OK':
      return state
    case 'BAD':
        const badUpdated = initialState.bad --
       
      return {...state, bad:badUpdated}
    case 'ZERO':
      
      return {...state, good:0, neutral:0, bad:0}
    default: return state
  }
  
}

export default counterReducer