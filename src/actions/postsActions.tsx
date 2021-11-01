import { Dispatch } from 'redux';
import { postActionTypes as types } from './types';
import { createPost, fetchPosts, getPostComments, deletePost } from '../api';

const setPostsData = (payload: unknown) => {
  return {
    type: types.QUERY_POSTS,
    payload,
  };
};

const setCommentsData = (payload: unknown) => {
  return {
    type: types.QUERY_COMMENTS,
    payload,
  };
};

export const fetchPostsAction = () => (dispatch: Dispatch) => {
  return fetchPosts()
    ?.then((resp) => {
      if (resp) {
        dispatch(setPostsData(resp));
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};
export const deletePostAction = (id: number) => (dispatch: Dispatch) => {
  return deletePost(id)
    .then((resp) => {
      if (resp) {
        dispatch({
          type: types.DELETE_POST,
          payload: true,
        });
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => Promise.reject(e));
};

export const createPostAction =
  (title: string, body: string) => (dispatch: Dispatch) => {
    return createPost(title, body)
      .then((resp) => {
        if (resp) {
          dispatch({
            type: types.POST_POST,
            payload: {
              data: resp.data,
            },
          });
          return true;
        }
        return Promise.reject(resp);
      })
      .catch((e) => {
        return Promise.reject(e);
      });
  };

export const fetchPostCommentsAction = (id: number) => (dispatch: Dispatch) => {
  return getPostComments(id)
    ?.then((resp) => {
      if (resp) {
        dispatch(setCommentsData(resp));
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => Promise.reject(e));
};
