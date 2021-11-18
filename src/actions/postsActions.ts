import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { TypeKeys } from 'actions/type-keys';
import { AppActions, IPost } from 'actions/types';
import { createPost, fetchPosts, getPostComments, deletePost } from 'api';

export const addPost = (post: IPost): AppActions => ({
  type: TypeKeys.ADD_POST,
  payload: { post },
});

export const removePost = (id: number): AppActions => ({
  type: TypeKeys.REMOVE_POST,
  id,
});

/* Add Post */
export const startAddPost = (postData: IPost) => {
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
    type: TypeKeys.POSTS_LOADING,
  });
  return fetchPosts()
    ?.then((res: any) => {
      if (res) {
        dispatch({
          type: TypeKeys.POSTS_SUCCESS,
          payload: {
            posts: res,
          },
        });
      }
    })
    .catch((e) => {
      dispatch({
        type: TypeKeys.POSTS_FAIL,
        payload: e.message,
      });
    });
};
/* Get Comments */
export const getComments =
  (pid: number) => (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: TypeKeys.COMMENTS_LOADING,
    });
    return getPostComments(pid)
      ?.then((res: any) => {
        if (res) {
          dispatch({
            type: TypeKeys.COMMENTS_SUCCESS,
            payload: {
              comments: res,
            },
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: TypeKeys.COMMENTS_FAIL,
          payload: e.message,
        });
      });
  };
