import { SET_PROFILE } from 'pages/Profile/ducks/action-types';

const initialState = {
  profile: {},
};

function profileReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_PROFILE:
      state = { ...state, profile: action.profile };
      break;
    default:
  }
  return state;
}

export default profileReducer;
