export type Post = {
  userId?: number;
  id?: number;
  title: string;
  body: string;
};
export type NewPost = {
  title: string;
  body: string;
};
export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

/* Action String */
export const POSTS_LOADING = 'POSTS_LOADING';
export const POSTS_SUCCESS = 'POSTS_SUCCESS';
export const POSTS_FAIL = 'POSTS_FAIL';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const COMMENTS_LOADING = 'COMMENTS_LOADING';
export const COMMENTS_SUCCESS = 'COMMENTS_SUCCESS';
export const COMMENTS_FAIL = 'COMMENTS_FAIL';

export interface IPostsLoading {
  type: typeof POSTS_LOADING;
}

export interface IPostsFailed {
  type: typeof POSTS_FAIL;
  payload: string;
}

export interface IPostsSuccess {
  type: typeof POSTS_SUCCESS;
  payload: {
    posts: Post[];
  };
}

export interface IAddPostAction {
  type: typeof ADD_POST;
  post: Post;
}

export interface IEditPostAction {
  type: typeof EDIT_POST;
  id: string;
}

export interface IRemovePostAction {
  type: typeof REMOVE_POST;
  id: number;
}

export interface ICommentLoading {
  type: typeof COMMENTS_LOADING;
}
export interface ICommentSuccess {
  type: typeof COMMENTS_SUCCESS;
  payload: {
    comments: Comment[];
  };
}
export interface ICommentFailed {
  type: typeof COMMENTS_FAIL;
  payload: string;
}

export type PostListActionTypes = IPostsLoading | IPostsFailed | IPostsSuccess;

export type PostActionTypes =
  | IAddPostAction
  | IRemovePostAction
  | IEditPostAction;
export type CommentsActionTypes =
  | ICommentLoading
  | ICommentSuccess
  | ICommentFailed;

export type AppActions =
  | PostListActionTypes
  | PostActionTypes
  | CommentsActionTypes;
