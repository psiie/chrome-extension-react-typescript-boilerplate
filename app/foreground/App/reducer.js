
export const initialState = {
  counter: 9,
};

function reducer(state = initialState, action) {
  console.log('inside reducer', action);
  switch (action.type) {
    case 'SET_AMOUNT':
      return { ...state, counter: action.amt };
    case 'FETCH_SUCCEEDED':
      console.log('fetch succ', action)
      return { ...state, counter: action.data };
    default:
      return state;
  }
}

export default reducer;