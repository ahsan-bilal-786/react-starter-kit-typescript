import { AUTH_USER, SIGNOUT } from 'pages/Auth/ducks/action-types';
import { setUserToken } from 'utils/user';
import { authenticateUser, registerUser, updateProfile } from 'api';

export function setAuthUser(payload: any) {
  return { type: AUTH_USER, payload };
}

export function deleteUserInfo() {
  return { type: SIGNOUT };
}

export const authenticateUserAction = (email: string, password: string) => (
  dispatch: any
) => {
  return authenticateUser(email, password)
    .then((resp) => {
      if (resp) {
        dispatch(setAuthUser(resp));
        setUserToken(resp);
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const registerUserAction = (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => (dispatch: any) => {
  return registerUser(email, password, firstName, lastName)
    .then((resp) => {
      if (resp) {
        dispatch(setAuthUser(resp));
        setUserToken(resp);
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};

export const updateProfileAction = (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => (dispatch: any, getState: any) => {
  const userId = getState().profile.userId;
  return updateProfile(userId, email, password, firstName, lastName)
    .then((resp) => {
      if (resp) {
        setUserToken(resp);
        return true;
      }
      return Promise.reject(resp);
    })
    .catch((e) => {
      return Promise.reject(e);
    });
};
