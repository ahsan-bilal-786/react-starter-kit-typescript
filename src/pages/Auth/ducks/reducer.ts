import { AUTH_USER, SIGNOUT } from 'pages/Auth/ducks/action-types';

const initialState = { user: {} };

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case AUTH_USER:
      state = {
        ...state,
        user: { token: action.payload.token, ...action.payload.user },
      };
      break;
    case SIGNOUT:
      state = initialState;
      break;
    default:
  }
  return state;
}

export default reducer;
