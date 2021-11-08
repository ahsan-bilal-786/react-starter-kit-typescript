import {
  Post,
  Comment,
  POSTS_FAIL,
  POSTS_LOADING,
  POSTS_SUCCESS,
  AppActions,
  ADD_POST,
  COMMENTS_LOADING,
  COMMENTS_SUCCESS,
  COMMENTS_FAIL,
} from '../actions/types';

interface IDefaultState {
  loading: boolean;
  data?: Post[];
  error?: string;
  comments?: {
    loading: boolean;
    data?: Comment[];
    error?: string;
  };
}
const defaultState = {
  loading: false,
  error: '',
  data: [],
  comments: {
    loading: false,
    data: [],
    error: '',
  },
};
export const postReducer = (
  state: IDefaultState = defaultState,
  action: AppActions
): IDefaultState => {
  switch (action.type) {
    case POSTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case POSTS_LOADING:
      return {
        loading: true,
      };
    case POSTS_SUCCESS:
      return {
        loading: false,
        data: action.payload.posts,
      };
    case ADD_POST:
      const clonePosts = state.data || [];
      return {
        ...state,
        data: [...clonePosts, action.post],
      };
    case COMMENTS_LOADING:
      return {
        ...state,
        comments: {
          loading: true,
        },
      };
    case COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          loading: false,
          data: action.payload.comments,
        },
      };
    case COMMENTS_FAIL:
      return {
        ...state,
        comments: {
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
};
