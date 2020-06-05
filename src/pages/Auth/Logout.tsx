import React, { useEffect } from 'react';
import { AppRoutes } from 'routes';
import { deleteUserToken } from 'utils/user';

const Logout = () => {
  useEffect(() => {
    deleteUserToken();
    window.location.replace(AppRoutes.LOGIN.path);
  }, []);
  return <></>;
};

export default Logout;
