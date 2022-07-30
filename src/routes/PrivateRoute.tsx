import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getAuthToken, initUserSessionFromCookie } from "utils/user";
import { AppRoutes } from "routes";

const RequireAuth = ({ children, ...rest }: any) => {
  const { initUserSessionAction } = rest;
  const isAuthenticated = getAuthToken() ? true : false;
  const location = useLocation();

  if (isAuthenticated) {
    initUserSessionAction();
  }

  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.login} state={{ from: location }} replace />;
  }

  return children;
};

function mapStateToProps(state: any) {
  return { user: state.auth.user };
}

const mapDispatchToProps = (dispatch: any) => {
  return { initUserSessionAction: () => dispatch(initUserSessionFromCookie()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
