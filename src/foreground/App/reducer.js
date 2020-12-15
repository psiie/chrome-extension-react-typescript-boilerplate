
export const initialState = {
  counter: 9,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_AMOUNT':
      return { ...state, counter: action.data };
    case 'FETCH_SUCCEEDED':
      return { ...state, counter: action.data };
    default:
      return state;
  }
}

export default reducer;