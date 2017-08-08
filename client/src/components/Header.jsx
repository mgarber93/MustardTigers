import React from 'react'
import { Link } from 'react-router-dom'
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
            <Link to="/">Our Shitty Steam Community App</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to='/login'>
              <NavItem>Login</NavItem>
            </LinkContainer>
            <LinkContainer to='/signup'>
              <NavItem>Signup</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    ) 
  }
}

export default Header;