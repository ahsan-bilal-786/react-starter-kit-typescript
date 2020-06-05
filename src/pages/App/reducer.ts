import { SHOW_LOADING } from 'pages/App/actions/action-types';

const initialState = {
  isLoading: false,
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case SHOW_LOADING:
      state = { ...state, isLoading: action.payload };
      break;
    default:
  }
  return state;
}

export default reducer;
