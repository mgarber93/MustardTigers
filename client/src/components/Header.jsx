import React from 'react';
import { Link } from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, Glyphicon} from 'react-bootstrap';

/**
 * Component representing the React Header Component.
 * @extends Header
 */
 
const Header = ({username, clans}) => (
  <Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Mustard Tiger Clan Builder</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        {clans.map(clan => (
          <LinkContainer key={clan.id} to={`/${clan.id}`}>
            <NavItem>{clan.name}</NavItem>
          </LinkContainer>
        ))}
        {username ? 
          (
            <LinkContainer to={`/users/${username}`}>
              <NavItem>{username}</NavItem>
            </LinkContainer>
          ) : 
          (
            <LinkContainer to='/login'>
              <NavItem>Login</NavItem>
            </LinkContainer>
          )
        }
        {username ? 
          (
            <LinkContainer to='/logout'>
              <NavItem>logout</NavItem>
            </LinkContainer>
          ) : 
          (
            <LinkContainer to='/register'>
              <NavItem>Register</NavItem>
            </LinkContainer>
          )
        }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;