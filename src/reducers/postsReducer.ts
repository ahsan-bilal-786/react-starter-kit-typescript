import { TypeKeys } from 'actions/type-keys';
import { IPost, IComment, AppActions } from '../actions/types';

interface IDefaultState {
  loading: boolean;
  data?: IPost[];
  error?: string;
  comments?: {
    loading: boolean;
    data?: IComment[];
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
    case TypeKeys.POSTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TypeKeys.POSTS_LOADING:
      return {
        loading: true,
      };
    case TypeKeys.POSTS_SUCCESS:
      return {
        loading: false,
        data: action.payload.posts,
      };
    case TypeKeys.ADD_POST:
      const clonePosts = state.data || [];
      return {
        ...state,
        data: [action.payload.post, ...clonePosts],
      };
    case TypeKeys.COMMENTS_LOADING:
      return {
        ...state,
        comments: {
          loading: true,
        },
      };
    case TypeKeys.COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          loading: false,
          data: action.payload.comments,
        },
      };
    case TypeKeys.COMMENTS_FAIL:
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
