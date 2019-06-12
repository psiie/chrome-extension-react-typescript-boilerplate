
const initialState = {
  counter: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AMOUNT':
      return { ...state, counter: action.amt };
    default:
      return state;
  }
}

export default reducer;