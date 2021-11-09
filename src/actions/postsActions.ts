import { Dispatch } from 'redux';
import {
  Post,
  AppActions,
  ADD_POST,
  REMOVE_POST,
  POSTS_LOADING,
  POSTS_FAIL,
  POSTS_SUCCESS,
  COMMENTS_LOADING,
  COMMENTS_SUCCESS,
  COMMENTS_FAIL,
} from './types';
import { createPost, fetchPosts, getPostComments, deletePost } from '../api';
import { toast } from 'react-toastify';

export const addPost = (post: Post): AppActions => ({
  type: ADD_POST,
  post,
});

export const removePost = (id: number): AppActions => ({
  type: REMOVE_POST,
  id,
});

/* Add Post */
export const startAddPost = (postData: Post) => {
  return (dispatch: Dispatch<AppActions>) => {
    const { title = '', body = '' } = postData;
    const post = { title, body };
    return createPost(title, body)
      .then((resp: any) => {
        if (resp) {
          dispatch(
            addPost({
              id: resp.data.id,
              ...post,
            })
          );
          return true;
        }
      })
      .catch((e) => {
        toast.error(`Sorry Something went wrong!`);
        return Promise.reject(e);
      });
  };
};

/* Remove Post */
export const startRemovePost =
  (id: number) => (dispatch: Dispatch<AppActions>) => {
    return deletePost(id)
      .then((resp) => {
        if (resp) {
          dispatch(removePost(id));
          toast.success('Post deleted!');
        }
        return true;
      })
      .catch((e) => {
        return e.message;
      });
  };
/* Get Posts */
export const getPosts = () => (dispatch: Dispatch<AppActions>) => {
  dispatch({
    type: POSTS_LOADING,
  });
  return fetchPosts()
    ?.then((res: any) => {
      if (res) {
        dispatch({
          type: POSTS_SUCCESS,
          payload: {
            posts: res,
          },
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: POSTS_FAIL,
        payload: e.message,
      });
    });
};
/* Get Comments */
export const getComments =
  (pid: number) => (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: COMMENTS_LOADING,
    });
    return getPostComments(pid)
      ?.then((res: any) => {
        if (res) {
          dispatch({
            type: COMMENTS_SUCCESS,
            payload: {
              comments: res,
            },
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: COMMENTS_FAIL,
          payload: e.message,
        });
      });
  };
