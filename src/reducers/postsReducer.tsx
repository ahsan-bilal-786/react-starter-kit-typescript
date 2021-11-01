import { postActionTypes as postTypes } from '../actions/types';

const initState = {
  data: [],
  comments: [],
  deleting: false,
};
export const postReducer = (state = initState, action: any) => {
  switch (action.type) {
    case postTypes.QUERY_POSTS:
      return {
        ...state,
        data: action.payload,
      };
    case postTypes.POST_POST:
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };
    case postTypes.QUERY_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case postTypes.DELETE_POST:
      return {
        ...state,
        deleting: action.payload,
      };
    default:
      return { ...state };
  }
};
