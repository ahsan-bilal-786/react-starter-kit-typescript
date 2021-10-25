import { Dispatch } from 'redux';
import { JSON_API_PATH } from '../config'
import {postActionTypes as types} from './types';
import axios from 'axios';

export const fetchPostsAction = () => async (dispatch: Dispatch) => {
    const posts = await axios.get(`${JSON_API_PATH}/posts`)
        .then((res) => {
            return res.data
        })
        .catch((error)=> {
            return error.message
        });

    dispatch({
        type: types.QUERY_POSTS,
        payload: posts
    })
}
export const deletePostAction = (id: number) => async (dispatch: Dispatch) => {
    dispatch({
        type: types.DELETE_POST,
        payload: true
    })
    return axios.delete(`${JSON_API_PATH}/posts/${id}`)
        .then((res)=> {
            dispatch({
                type: types.DELETE_POST,
                payload: false
            })
            return res
        })
        .catch((error)=> {
            return error.message
        })
}
export const createPostAction = (post: {title: string, body: string}) => async (dispatch: Dispatch) => {
    return axios.post(`${JSON_API_PATH}/posts`, post)
        .then((res)=> {
            return res
        })
        .catch((error)=> {
            return error.message
        })
}

export const fetchPostCommentsAction = (id: number) => async (dispatch: Dispatch) => {
    const comments =  await axios.get(`${JSON_API_PATH}/posts/${id}/comments`)
        .then((res)=> {
            return res.data
        })
        .catch((error)=> {
            return error.message
        })
    dispatch({
        type: types.QUERY_COMMENTS,
        payload: comments
    })
}