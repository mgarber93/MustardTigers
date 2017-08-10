import React from 'react';
import { Link } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, Glyphicon} from 'react-bootstrap';

/**
 * Class representing the React Header Component.
 * @extends Header
 */
 
class Header extends React.Component {
  constructor (props) {
    super(props);
  }
  
  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Mustard Tiger Clan Builder</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to='/clan'>
              <NavItem>Clan</NavItem>
            </LinkContainer>
            <LinkContainer to='/login'>
              <NavItem>Login</NavItem>
            </LinkContainer>
            <LinkContainer to='/register'>
              <NavItem>Register</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;