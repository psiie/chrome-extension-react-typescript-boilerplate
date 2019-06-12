
export const initialState = {
  counter: 9,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AMOUNT':
      console.log('set amount', state, action.amt)
      return { ...state, counter: action.amt };
    default:
      return state;
  }
}

export default reducer;