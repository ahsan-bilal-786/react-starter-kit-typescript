import axios from 'axios';
import getRoute from 'api/routes';
import { AppRoutes } from 'routes';

export const setAuthToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const failedResponse = (error: any) => {
  if (
    error.response &&
    error.response.status &&
    error.response.status === 401
  ) {
    window.location.replace(AppRoutes.LOGOUT.path);
  }
  return Promise.reject(error);
};

const getRequest = (route: string) => {
  if (!route) {
    return;
  }
  return axios
    .get(route)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const postRequest = (route: string, data = {}) => {
  return axios
    .post(route, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const putRequest = (route: string, data = {}) => {
  return axios
    .put(route, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};
export const delRequest = (route: string, data = {}) => {
  return axios
    .delete(route, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const registerUser = (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const data = { email, password, firstName, lastName };
  const route = getRoute('registerUser');
  return postRequest(route, data);
};

export const authenticateUser = (email: string, password: string) => {
  const data = { email, password };
  const route = getRoute('login');
  return postRequest(route, data);
};

export const getUserInfo = (userId: number) => {
  const route = getRoute('userProfile', { userId });
  return getRequest(route);
};

export const updateProfile = (
  userId: number,
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const data = { email, password, firstName, lastName };
  const route = getRoute('userProfile', { userId });
  return putRequest(route, data);
};

export const fetchPosts = () => {
  const route = getRoute('getPosts');
  return getRequest(route);
};

export const createPost = (title: string, body: string) => {
  const route = getRoute('getPosts');
  return postRequest(route, { title, body });
};
export const getPostComments = (id: number) => {
  const route = getRoute('getPostComments', { postId: id });
  return getRequest(route);
};
export const deletePost = (id: number) => {
  const route = getRoute('deletePost', { postId: id });
  return delRequest(route);
};
