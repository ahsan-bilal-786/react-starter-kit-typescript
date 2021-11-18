import { TypeKeys } from 'actions/type-keys';

export interface IPost {
  userId?: number;
  id?: number;
  title: string;
  body: string;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IPostsLoading {
  type: TypeKeys.POSTS_LOADING;
}

export interface IPostsFailed {
  type: TypeKeys.POSTS_FAIL;
  payload: string;
}

export interface IPostsSuccess {
  type: TypeKeys.POSTS_SUCCESS;
  payload: {
    posts: IPost[];
  };
}

export interface IAddPostAction {
  type: TypeKeys.ADD_POST;
  payload: {
    post: IPost;
  };
}

export interface IEditPostAction {
  type: TypeKeys.EDIT_POST;
  id: string;
}

export interface IRemovePostAction {
  type: TypeKeys.REMOVE_POST;
  id: number;
}

export interface ICommentLoading {
  type: TypeKeys.COMMENTS_LOADING;
}

export interface ICommentSuccess {
  type: TypeKeys.COMMENTS_SUCCESS;
  payload: {
    comments: IComment[];
  };
}

export interface ICommentFailed {
  type: TypeKeys.COMMENTS_FAIL;
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
