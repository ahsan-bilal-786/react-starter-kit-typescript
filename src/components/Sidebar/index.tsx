import React, { memo } from 'react';
import { Nav } from 'react-bootstrap';
import { Sidebar as Wrapper, Link } from 'components/Sidebar/style';
import { AppRoutes, DashboardRoutes } from 'routes';

const Sidebar = memo(() => {
  return (
    <Wrapper>
      <Nav>
        <Link to={DashboardRoutes.MAIN.path}>Dashboard</Link>
        <Link to={DashboardRoutes.PROFILE.path}>Profile</Link>
        <Link to={DashboardRoutes.CHANGE_PASSWORD.path}>Change Password</Link>
        <Link to={AppRoutes.LOGOUT.path}>Logout</Link>
      </Nav>
    </Wrapper>
  );
});

export default Sidebar;
