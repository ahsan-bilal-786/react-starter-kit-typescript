import { SET_PROFILE } from 'pages/Profile/ducks/action-types';

export function setProfile(payload: any) {
  return { type: SET_PROFILE, payload };
}
