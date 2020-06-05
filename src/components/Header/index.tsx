import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { APP_NAME } from 'config';
import { AppRoutes, DashboardRoutes } from 'routes';
import {
  UserDropDown,
  NavDropDownLink,
  AppTitle,
} from 'components/Header/style';

/**
 * Header is a template top navigation bar of user layout
 */
const Header = () => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Navbar.Brand>
        <AppTitle to={AppRoutes.DASHBOARD.path}>{APP_NAME}</AppTitle>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        <Nav className='mr-auto'></Nav>
        <Nav>
          <UserDropDown
            alignRight
            className='dropdown-menu-right'
            title={<FontAwesomeIcon icon={faUserCircle} title='' />}
          >
            <NavDropDownLink to={DashboardRoutes.PROFILE.path}>
              Profile
            </NavDropDownLink>
            <NavDropdown.Divider />
            <NavDropDownLink to={DashboardRoutes.CHANGE_PASSWORD.path}>
              Change Password
            </NavDropDownLink>
            <NavDropdown.Divider />
            <NavDropDownLink to={AppRoutes.LOGOUT.path}>Logout</NavDropDownLink>
          </UserDropDown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
