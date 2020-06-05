import { LOADING } from 'pages/Dashboard/ducks/action-types';

const initialState = {
  isLoading: false,
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case LOADING:
      state = { ...state, isLoading: action.payload };
      break;
    default:
  }
  return state;
}

export default reducer;
